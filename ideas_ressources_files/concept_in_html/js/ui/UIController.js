import { UI_MODES } from "./UI_MODES.js";
import { UI_EVENTS } from "./UI_EVENTS.js";
import { UI_IDS } from "./UI_IDS.js"; // if you already added it

export default class UIController {
  constructor(bus) {
    this.bus = bus;

    this.el = {
      uiRoot: this.#mustGet(UI_IDS.ROOT),
      avatarUI: this.#mustGet(UI_IDS.AVATAR_UI),

      saveBtn: this.#mustGet(UI_IDS.SAVE_BTN),
      exportBtn: this.#mustGet(UI_IDS.EXPORT_BTN),
      importBtn: this.#mustGet(UI_IDS.IMPORT_BTN),
      importFile: this.#mustGet(UI_IDS.IMPORT_FILE),

      backBtn: this.#mustGet(UI_IDS.BACK_BTN),
      confirmBtn: this.#mustGet(UI_IDS.CONFIRM_BTN),
    };

    this.#wireEvents();

    this.setMode(UI_MODES.NONE);
    this.setConfirmEnabled(false);
  }

  /* =========================================================
     Public API (what game states should use)
     ========================================================= */

  /**
   * Modes:
   * - "avatar": avatar selection UI visible, confirm visible, topbar buttons hidden.
   * - "garden": avatar UI hidden, save/export/import/back visible.
   * - "none": everything hidden (safe reset).
   */
  setMode(mode) {
    const m = mode ?? UI_MODES.NONE;

    // Always start by hiding everything we control
    this.#hide(this.el.avatarUI);

    this.#hide(this.el.saveBtn);
    this.#hide(this.el.exportBtn);
    this.#hide(this.el.importBtn);
    this.#hide(this.el.backBtn);
    this.#hide(this.el.confirmBtn);

    if (m === "avatar") {
      this.#show(this.el.avatarUI);
      this.#show(this.el.confirmBtn);
      return;
    }

    if (m === "garden") {
      this.#show(this.el.saveBtn);
      this.#show(this.el.exportBtn);
      this.#show(this.el.importBtn);
      this.#show(this.el.backBtn);
      // confirm stays hidden in garden
      return;
    }

    // "none" => keep all hidden
  }

  setConfirmEnabled(
    enabled,
    textWhenEnabled = "Continue",
    textWhenDisabled = "Locked — cannot confirm"
  ) {
    const btn = this.el.confirmBtn;
    btn.disabled = !enabled;
    btn.textContent = enabled ? textWhenEnabled : textWhenDisabled;
  }

  /* =========================================================
     Internal helpers
     ========================================================= */

  #wireEvents() {
    // Simple button clicks
    this.el.saveBtn.addEventListener("click", () => this.bus.emit(UI_EVENTS.SAVE));
    this.el.exportBtn.addEventListener("click", () => this.bus.emit(UI_EVENTS.EXPORT));
    this.el.backBtn.addEventListener("click", () => this.bus.emit(UI_EVENTS.BACK_TO_AVATAR));
    this.el.confirmBtn.addEventListener("click", () => this.bus.emit(UI_EVENTS.CONFIRM_AVATAR));

    // Import flow (UI owns file picker + parse)
    this.el.importBtn.addEventListener("click", () => {
      this.el.importFile.value = "";
      this.el.importFile.click();
    });

    this.el.importFile.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const payload = JSON.parse(text);
        this.bus.emit(UI_EVENTS.IMPORT_PAYLOAD, { payload, file });
      } catch (err) {
        console.error(err);
        alert("Import failed: " + (err?.message || err));
      }
    });

    this.el.confirmBtn.addEventListener("click", () => {
      if (this.el.confirmBtn.disabled) return;
      this.bus.emit(UI_EVENTS.CONFIRM_AVATAR);
    });
  }

  #show(node) {
    node.classList.remove("hidden");
  }

  #hide(node) {
    node.classList.add("hidden");
  }

  #mustGet(id) {
    const el = document.getElementById(id);
    if (!el) {
      throw new Error(`UIController: missing element #${id}`);
    }
    return el;
  }
}