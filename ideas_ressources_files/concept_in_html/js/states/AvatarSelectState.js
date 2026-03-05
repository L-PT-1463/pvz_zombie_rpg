import SaveSystem from "../storage/SaveSystem.js";
import { MODELS } from "../data/models.js";
import AssetLoader from "../../assets/AssetLoader.js";
import { tintWhiteSprite } from "../rendering/tint.js";
import FightingGardenState from "./FightingGardenState.js";
import { UI_MODES } from "../ui/UI_MODES.js";
import { UI_EVENTS } from "../ui/UI_EVENTS.js";

export default class AvatarSelectState {
  constructor(game) {
    this.game = game;
    this.unsubs = [];

    // --- UI mode ---
    this.game.ui.setMode(UI_MODES.AVATAR);

    // --- Load profile (settings + avatar + unlocks) ---
    this.profile = SaveSystem.loadProfile();

    // Model registry
    this.models = MODELS;

    // Assets
    this.assets = new AssetLoader();

    // Resolve saved model index
    const savedIndex = this.models.findIndex((m) => m.id === this.profile.avatar.modelId);
    this.selectedModelIndex = savedIndex >= 0 ? savedIndex : 0;

    // Color (saved), fallback to model default
    const currentModel = this.getCurrentModel();
    this.color = this.profile.avatar.color || currentModel.defaultColor;

    // Queue sprites for initial model
    this.queueModelSprites(currentModel);

    // --- Cache DOM refs ---
    this.leftArrow    = document.getElementById("leftArrow");
    this.rightArrow   = document.getElementById("rightArrow");
    this.previewFrame = document.getElementById("previewFrame");
    this.modelName    = document.getElementById("modelName");
    this.colorPicker  = document.getElementById("tieColorPicker");
    this.colorLabel   = document.querySelector(`#colorSelector label[for="tieColorPicker"]`);

    // --- Local UI interactions (state-specific elements) ---
    if (this.leftArrow)  this.leftArrow.onclick  = () => this.cycleModel(-1);
    if (this.rightArrow) this.rightArrow.onclick = () => this.cycleModel(1);

    if (this.colorPicker) {
      this.colorPicker.oninput = (e) => {
        this.color = e.target.value;

        // Persist only if current model is unlocked
        if (this.isModelUnlocked(this.getCurrentModel())) {
          this.persistAvatar();
        }

        this.refreshUIFromState();
      };
    }

    // --- Confirm (via UI Bus) ---
    this.unsubs.push(
      this.game.uiBus.on(UI_EVENTS.CONFIRM_AVATAR, () => {
        const model = this.getCurrentModel();
        if (!this.isModelUnlocked(model)) return;

        this.persistAvatar();

        this.game.changeState(() => new FightingGardenState(this.game, {
          modelId: this.profile.avatar.modelId,
          color: this.profile.avatar.color,
        }));
      })
    );

    // --- Keyboard controls (same behavior, but no button .click() hack) ---
    this.onKeyDown = (e) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();

      // Navigation
      if (key === "arrowleft" || key === "a") {
        e.preventDefault();
        this.cycleModel(-1);
        return;
      }
      if (key === "arrowright" || key === "d") {
        e.preventDefault();
        this.cycleModel(1);
        return;
      }

      // Confirm
      if (key === "enter") {
        e.preventDefault();
        const model = this.getCurrentModel();
        if (!this.isModelUnlocked(model)) return;

        // Just emit the same logical confirm action
        this.game.uiBus.emit(UI_EVENTS.CONFIRM_AVATAR);
        return;
      }

      // Debug keys (unchanged)
      if (key === "u") {
        for (const m of this.models) this.profile.unlocks[m.id] = true;
        SaveSystem.saveProfile(this.profile);
        this.refreshUIFromState();
        console.log("DEBUG: unlocked all models");
        return;
      }

      if (key === "l") {
        this.profile.unlocks = { browncoat: true };
        SaveSystem.saveProfile(this.profile);
        this.refreshUIFromState();
        console.log("DEBUG: locked all models (except browncoat)");
        return;
      }

      if (key === "r") {
        SaveSystem.resetProfile();
        this.profile = SaveSystem.loadProfile();

        const savedIndex2 = this.models.findIndex((m) => m.id === this.profile.avatar.modelId);
        this.selectedModelIndex = savedIndex2 >= 0 ? savedIndex2 : 0;

        this.color = this.profile.avatar.color || this.getCurrentModel().defaultColor;

        this.refreshUIFromState();
        console.log("DEBUG: profile reset");
        return;
      }
    };

    window.addEventListener("keydown", this.onKeyDown);

    // Initial paint
    this.refreshUIFromState();
  }

  // ---------- helpers ----------
    getPreviewRectInCanvasSpace(renderer) {
    // Fallback if frame is missing
    if (!this.previewFrame) {
      return {
        x: renderer.width * 0.23 - 130,
        y: renderer.height * 0.5 - 180,
        w: 260,
        h: 360
      };
    }

    const rect = this.previewFrame.getBoundingClientRect();

    // Canvas uses logical pixels because renderer scales for DPR internally
    // So we can use rect values directly.
    return {
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height
    };
  }

  getCurrentModel() {
    return this.models[this.selectedModelIndex];
  }

  isModelUnlocked(model) {
    // browncoat should always be unlocked
    if (model.id === "browncoat") return true;
    return this.profile.unlocks?.[model.id] === true;
  }

  persistAvatar() {
    const model = this.getCurrentModel();
    this.profile.avatar.modelId = model.id;
    this.profile.avatar.color = this.color;
    SaveSystem.saveProfile(this.profile);
  }

  queueModelSprites(model) {
    if (!model?.sprites) return;

    // Keys are stable and unique per model
    this.assets.loadImage(`${model.id}_base`, model.sprites.base);
    this.assets.loadImage(`${model.id}_color`, model.sprites.color);
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
    if (this.modelName) {
      this.modelName.textContent = unlocked ? model.displayName : `${model.displayName} (locked)`;
      this.modelName.title = unlocked ? "" : (model.unlockHint || "Locked");
    }

    // Label changes depending on model
    const partName = model.recolorPartName || "Color";
    if (this.colorLabel) this.colorLabel.textContent = `${partName} Color`;

    // Color picker always shows current chosen color (even if locked)
    if (this.colorPicker) {
      this.colorPicker.value = this.color;
      this.colorPicker.disabled = !unlocked; // locked = preview only
    }

    // Confirm handled by UIController
    this.game.ui.setConfirmEnabled(unlocked, "Confirm", "Locked Avatar");
  }

  // ---------- game loop ----------
  update(dt) {}

  render(renderer) {
    renderer.clear();
    renderer.fillRect(0, 0, renderer.width, renderer.height, "#1a1a1a");

    const model = this.getCurrentModel();
    const unlocked = this.isModelUnlocked(model);
    const box = this.getPreviewRectInCanvasSpace(renderer);


    // Approx preview position (matches your left-side layout)
    const centerX = renderer.width * 0.23;
    const centerY = renderer.height * 0.5;

    const baseKey = `${model.id}_base`;
    const colorKey = `${model.id}_color`;

    const baseImg = this.assets.getImage(baseKey);
    const colorImg = this.assets.getImage(colorKey);

    if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) {
      renderer.fillRect(box.x, box.y, box.w, box.h, "#333");
      renderer.fillRect(box.x + box.w * 0.15, box.y + box.h * 0.48, box.w * 0.7, 20, "#555");
      return;
    }

    // Fit sprite into box
    const spriteW = baseImg.width;
    const spriteH = baseImg.height;

    const scale = Math.min(box.w / spriteW, box.h / spriteH);
    const drawW = spriteW * scale;
    const drawH = spriteH * scale;

    const drawX = box.x + (box.w - drawW) / 2;
    const drawY = box.y + (box.h - drawH) / 2;

    // Draw base
    renderer.drawImage(baseImg, drawX, drawY, drawW, drawH);

    // Draw tinted overlay ALWAYS (locked or not), using current color
    if (colorImg && colorImg.complete && colorImg.naturalWidth !== 0) {
      const tinted = tintWhiteSprite(colorImg, this.color);
      renderer.drawImage(tinted, drawX, drawY, drawW, drawH);
    }

    // If locked, add subtle dim over the preview box
    if (!unlocked) {
      renderer.ctx.save();
      renderer.ctx.globalAlpha = 0.25;
      renderer.fillRect(box.x, box.y, box.w, box.h, "#000");
      renderer.ctx.restore();
    }
  }

  destroy() {
    // Unsubscribe bus listeners
    for (const off of this.unsubs) off();
    this.unsubs = [];

    window.removeEventListener("keydown", this.onKeyDown);

    // Clear direct element handlers to avoid weirdness if DOM persists
    if (this.leftArrow) this.leftArrow.onclick = null;
    if (this.rightArrow) this.rightArrow.onclick = null;
    if (this.colorPicker) this.colorPicker.oninput = null;
  }
}