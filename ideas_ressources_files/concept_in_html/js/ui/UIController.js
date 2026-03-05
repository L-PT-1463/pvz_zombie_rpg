// UIController.js
export default class UIController {
  constructor() {
    this.el = {
      uiRoot: this.#mustGet("ui"),
      avatarUI: this.#mustGet("avatarUI"),

      saveBtn: this.#mustGet("saveRunBtn"),
      exportBtn: this.#mustGet("exportSaveBtn"),
      importBtn: this.#mustGet("importSaveBtn"),
      importFile: this.#mustGet("importSaveFile"),

      backBtn: this.#mustGet("backToAvatar"),
      confirmBtn: this.#mustGet("confirmAvatar"),
    };

    // Handlers (we store them so we can always remove cleanly)
    this.handlers = {
      save: null,
      export: null,
      back: null,
      confirm: null,
      importPayload: null, // (payload) => void
    };

    // Bindings we control internally
    this.#wireInternalImportFlow();

    // Start from known state
    this.setMode("none");
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
    const m = String(mode || "none").toLowerCase();

    // Always start by hiding everything we control
    this.#hide(this.el.avatarUI);

    this.#hide(this.el.saveBtn);
    this.#hide(this.el.exportBtn);
    this.#hide(this.el.importBtn);
    this.#hide(this.el.backBtn);
    this.#hide(this.el.confirmBtn);

    // Also clear handlers by default (prevents “old state” actions firing)
    this.setSaveHandler(null);
    this.setExportHandler(null);
    this.setBackHandler(null);
    this.setConfirmHandler(null);
    this.setImportPayloadHandler(null);

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

  // ---- Click handlers (no stacking) ----

  setSaveHandler(fn) {
    this.#setClickHandler("save", this.el.saveBtn, fn);
  }

  setExportHandler(fn) {
    this.#setClickHandler("export", this.el.exportBtn, fn);
  }

  setBackHandler(fn) {
    this.#setClickHandler("back", this.el.backBtn, fn);
  }

  setConfirmHandler(fn) {
    this.#setClickHandler("confirm", this.el.confirmBtn, fn);
  }

  /**
   * Called when user selects a JSON file via the Import button.
   * UIController will read+JSON.parse the file, then call `fn(payload, file)`.
   * If parsing fails, it will alert + console.error.
   */
  setImportPayloadHandler(fn) {
    this.handlers.importPayload = typeof fn === "function" ? fn : null;
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

  #wireInternalImportFlow() {
    // Import button ALWAYS just opens file picker.
    // State only defines what to do with the parsed payload.
    this.el.importBtn.addEventListener("click", () => {
      // reset so selecting the same file twice triggers change
      this.el.importFile.value = "";
      this.el.importFile.click();
    });

    // Parse file + forward payload to state handler
    this.el.importFile.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!this.handlers.importPayload) {
        console.warn("Import selected, but no import handler is set.");
        return;
      }

      try {
        const text = await file.text();
        const payload = JSON.parse(text);
        await this.handlers.importPayload(payload, file);
      } catch (err) {
        console.error(err);
        alert("Import failed: " + (err?.message || err));
      }
    });
  }

  #setClickHandler(key, element, fn) {
    // Remove previous
    if (this.handlers[key]) {
      element.removeEventListener("click", this.handlers[key]);
    }

    this.handlers[key] = typeof fn === "function" ? fn : null;

    if (this.handlers[key]) {
      element.addEventListener("click", this.handlers[key]);
    }
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