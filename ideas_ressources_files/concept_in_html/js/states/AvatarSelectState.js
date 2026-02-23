import SaveManager from "../storage/SaveManager.js";
import { MODELS } from "../data/models.js";

export default class AvatarSelectState {
  constructor(game) {
    this.game = game;

    // Load save
    this.save = SaveManager.load();

    // Model registry
    this.models = MODELS;

    // Resolve saved model index
    this.selectedModelIndex = Math.max(
      0,
      this.models.findIndex(m => m.id === this.save.avatar.modelId)
    );

    // Fallback if save refers to unknown model
    if (this.selectedModelIndex === -1) this.selectedModelIndex = 0;

    // Color (saved), fallback to model default
    const currentModel = this.getCurrentModel();
    this.color = this.save.avatar.color || currentModel.defaultColor;

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
      this.persistAvatar();
      this.refreshUIFromState();
    };
  }

  cycleModel(dir) {
    const max = this.models.length;
    let nextIndex = this.selectedModelIndex;

    // Cycle until we find something (we allow previewing locked,
    // but we won’t write locked into the save)
    nextIndex = (nextIndex + dir + max) % max;
    this.selectedModelIndex = nextIndex;

    const model = this.getCurrentModel();

    // If model is unlocked, adopt its default color if current color is empty
    // (we keep chosen color otherwise)
    if (!this.color) this.color = model.defaultColor;

    // Only persist if unlocked
    if (this.isModelUnlocked(model)) {
      // If switching to an unlocked model, keep current color but clamp to a default if missing
      if (!this.color) this.color = model.defaultColor;
      this.persistAvatar();
    }

    // Also update color picker to match current color
    this.refreshUIFromState();
  }

  refreshUIFromState() {
    const model = this.getCurrentModel();
    const unlocked = this.isModelUnlocked(model);

    // Name
    this.modelName.textContent = unlocked ? model.displayName : `${model.displayName} (locked)`;

    // Label changes depending on model
    const partName = model.recolorPartName || "Color";
    if (this.colorLabel) this.colorLabel.textContent = `${partName} Color`;

    // Color picker value
    this.colorPicker.value = this.color;

    // Disable picker if locked (since you can't commit to that model yet)
    this.colorPicker.disabled = !unlocked;

    // Optional: add tooltip/hint for locked models
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

    // Preview area (still approximate)
    const previewX = renderer.width * 0.23;
    const previewY = renderer.height * 0.5;

    // Body placeholder changes slightly if locked (just to show feedback)
    const model = this.getCurrentModel();
    const unlocked = this.isModelUnlocked(model);

    renderer.fillRect(previewX - 100, previewY - 150, 200, 300, unlocked ? "#444" : "#2b2b2b");
    renderer.fillRect(previewX - 20, previewY - 50, 40, 100, unlocked ? this.color : "#666");
  }
}