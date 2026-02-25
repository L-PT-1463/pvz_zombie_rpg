import SaveManager from "../storage/SaveManager.js";
import { MODELS } from "../data/models.js";
import AssetLoader from "../../assets/AssetLoader.js";
import { tintWhiteSprite } from "../rendering/tint.js";

export default class AvatarSelectState {
  constructor(game) {
    this.game = game;

    // Load save
    this.save = SaveManager.load();

    // Model registry
    this.models = MODELS;

    // Assets
    this.assets = new AssetLoader();

    // Resolve saved model index
    const savedIndex = this.models.findIndex((m) => m.id === this.save.avatar.modelId);
    this.selectedModelIndex = savedIndex >= 0 ? savedIndex : 0;

    // Color (saved), fallback to model default
    const currentModel = this.getCurrentModel();
    this.color = this.save.avatar.color || currentModel.defaultColor;

    // Queue sprites for initial model
    this.queueModelSprites(currentModel);

    this.setupUI();
    this.refreshUIFromState();
  }

  // ---------- helpers ----------
  getCurrentModel() {
    return this.models[this.selectedModelIndex];
  }

  isModelUnlocked(model) {
    // browncoat should always be unlocked
    if (model.id === "browncoat") return true;
    return this.save.unlocks?.[model.id] === true;
  }

  persistAvatar() {
    const model = this.getCurrentModel();
    this.save.avatar.modelId = model.id;
    this.save.avatar.color = this.color;
    SaveManager.save(this.save);
  }

  queueModelSprites(model) {
    if (!model?.sprites) return;

    // Keys are stable and unique per model
    this.assets.loadImage(`${model.id}_base`, model.sprites.base);
    this.assets.loadImage(`${model.id}_color`, model.sprites.color);
  }

  // ---------- UI ----------
  setupUI() {
    this.leftArrow = document.getElementById("leftArrow");
    this.rightArrow = document.getElementById("rightArrow");
    this.modelName = document.getElementById("modelName");
    this.colorPicker = document.getElementById("tieColorPicker");

    // We'll also repurpose the label text to match model part name
    this.colorLabel = document.querySelector(`#colorSelector label[for="tieColorPicker"]`);

    this.leftArrow.onclick = () => this.cycleModel(-1);
    this.rightArrow.onclick = () => this.cycleModel(1);

    this.colorPicker.oninput = (e) => {
      this.color = e.target.value;

      // Persist only if current model is unlocked
      if (this.isModelUnlocked(this.getCurrentModel())) {
        this.persistAvatar();
      }

      this.refreshUIFromState();
    };

    this.confirmButton = document.getElementById("confirmAvatar");

    this.confirmButton.onclick = () => {
      const model = this.getCurrentModel();
      const unlocked = this.isModelUnlocked(model);

      if (!unlocked) return; // should already be disabled, but safety

      // Save already happens on changes, but make sure it's consistent
      this.persistAvatar();

      // NEXT: later we will change state to the actual game
      // For now, just a placeholder action:
      console.log("Confirmed avatar:", this.save.avatar);

      // Example later:
      // this.game.changeState(new PlayingState(this.game));
    };

    this.onKeyDown = (e) => {
      if (e.repeat) return;

      const key = e.key.toLowerCase();

      if (key === "u") {
        // unlock all
        for (const m of this.models) {
          this.save.unlocks[m.id] = true;
        }
        SaveManager.save(this.save);
        this.refreshUIFromState();
        console.log("DEBUG: unlocked all models");
      }

      if (key === "l") {
        // lock all except browncoat
        this.save.unlocks = { browncoat: true };
        SaveManager.save(this.save);
        this.refreshUIFromState();
        console.log("DEBUG: locked all models (except browncoat)");
      }

      if (key === "r") {
        // reset save
        SaveManager.reset();
        this.save = SaveManager.load();

        // re-sync state from save
        this.selectedModelIndex = Math.max(
          0,
          this.models.findIndex(m => m.id === this.save.avatar.modelId)
        );
        this.color = this.save.avatar.color || this.getCurrentModel().defaultColor;

        this.refreshUIFromState();
        console.log("DEBUG: save reset");
      }
    };

    window.addEventListener("keydown", this.onKeyDown);

  }

  cycleModel(dir) {
    const max = this.models.length;

    // Move index
    this.selectedModelIndex = (this.selectedModelIndex + dir + max) % max;

    const model = this.getCurrentModel();
    this.queueModelSprites(model);

    // If switching and color is empty, use model default
    if (!this.color) this.color = model.defaultColor;

    // Only persist if unlocked
    if (this.isModelUnlocked(model)) {
      if (!this.color) this.color = model.defaultColor;
      this.persistAvatar();
    }

    this.refreshUIFromState();
  }

  refreshUIFromState() {
    const model = this.getCurrentModel();
    const unlocked = this.isModelUnlocked(model);

    // Name text
    this.modelName.textContent = unlocked ? model.displayName : `${model.displayName} (locked)`;

    // Label changes depending on model
    const partName = model.recolorPartName || "Color";
    if (this.colorLabel) this.colorLabel.textContent = `${partName} Color`;

    // Color picker always shows current chosen color (even if locked)
    this.colorPicker.value = this.color;

    // Locked model: you can preview with current color, but cannot change it
    this.colorPicker.disabled = !unlocked;

    // Confirm button disabled when locked
    if (this.confirmButton) {
      this.confirmButton.disabled = !unlocked;
      this.confirmButton.textContent = unlocked ? "Confirm" : "Locked Avatar";
    }

    // Tooltip hint for locked models
    if (!unlocked) {
      this.modelName.title = model.unlockHint || "Locked";
    } else {
      this.modelName.title = "";
    }
  }

  // ---------- game loop ----------
  update(dt) {}

  render(renderer) {
    renderer.clear();
    renderer.fillRect(0, 0, renderer.width, renderer.height, "#1a1a1a");

    const model = this.getCurrentModel();
    const unlocked = this.isModelUnlocked(model);

    // Approx preview position (matches your left-side layout)
    const centerX = renderer.width * 0.23;
    const centerY = renderer.height * 0.5;

    const baseKey = `${model.id}_base`;
    const colorKey = `${model.id}_color`;

    const baseImg = this.assets.getImage(baseKey);
    const colorImg = this.assets.getImage(colorKey);

    // If base sprite not ready, show loading placeholder
    if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) {
      renderer.fillRect(centerX - 130, centerY - 180, 260, 360, "#333");
      renderer.fillRect(centerX - 90, centerY + 140, 180, 18, "#555");
      return;
    }

    // Fit sprite into a target preview height
    const spriteW = baseImg.width;
    const spriteH = baseImg.height;

    const targetH = 360; // matches #previewFrame height
    const scale = targetH / spriteH;

    const drawW = spriteW * scale;
    const drawH = spriteH * scale;

    const drawX = centerX - drawW / 2;
    const drawY = centerY - drawH / 2;

    // Draw base
    renderer.drawImage(baseImg, drawX, drawY, drawW, drawH);

    // Draw tinted overlay (only if unlocked and overlay loaded)
    if (colorImg && colorImg.complete && colorImg.naturalWidth !== 0) {
      const tinted = tintWhiteSprite(colorImg, this.color);
      renderer.drawImage(tinted, drawX, drawY, drawW, drawH);
    }

    // If locked, dim preview a bit
    if (!unlocked) {
      renderer.ctx.save();
      renderer.ctx.globalAlpha = 0.35;
      renderer.fillRect(drawX, drawY, drawW, drawH, "#000");
      renderer.ctx.restore();
    }
  }

  destroy() {
    window.removeEventListener("keydown", this.onKeyDown);
  };
}