export default class UIController {
  constructor() {
    this.uiRoot = document.getElementById("ui");

    // Sections
    this.avatarUIRoot = document.getElementById("avatarUI");

    // Shared buttons
    this.backBtn = document.getElementById("backToAvatar");
    this.confirmBtn = document.getElementById("confirmAvatar");

    // Internal refs to cleanup
    this._backHandler = null;
    this._confirmHandler = null;

    // Start from a known state (nothing shown except what a state asks for)
    this.hideAll();
  }

  hideAll() {
    // Hide blocks
    if (this.avatarUIRoot) this.avatarUIRoot.classList.add("hidden");

    // Hide buttons
    if (this.backBtn) this.backBtn.style.display = "none";
    if (this.confirmBtn) this.confirmBtn.style.display = "none";

    // Remove handlers
    this.setBackHandler(null);
    this.setConfirmHandler(null);
  }

  // ---------- Modes ----------
  showAvatarSelectUI() {
    // avatar UI visible
    if (this.avatarUIRoot) this.avatarUIRoot.classList.remove("hidden");

    // confirm visible
    if (this.confirmBtn) this.confirmBtn.style.display = "";

    // back hidden in avatar select
    if (this.backBtn) this.backBtn.style.display = "none";
    this.setBackHandler(null);
  }

  showGardenUI() {
    // avatar UI hidden
    if (this.avatarUIRoot) this.avatarUIRoot.classList.add("hidden");

    // confirm hidden in garden
    if (this.confirmBtn) this.confirmBtn.style.display = "none";
    this.setConfirmHandler(null);

    // back visible in garden
    if (this.backBtn) this.backBtn.style.display = "";
  }

  // ---------- Shared handlers ----------
  setBackHandler(fn) {
    if (this.backBtn && this._backHandler) {
      this.backBtn.removeEventListener("click", this._backHandler);
    }
    this._backHandler = typeof fn === "function" ? fn : null;
    if (this.backBtn && this._backHandler) {
      this.backBtn.addEventListener("click", this._backHandler);
    }
  }

  setConfirmHandler(fn) {
    if (this.confirmBtn && this._confirmHandler) {
      this.confirmBtn.removeEventListener("click", this._confirmHandler);
    }
    this._confirmHandler = typeof fn === "function" ? fn : null;
    if (this.confirmBtn && this._confirmHandler) {
      this.confirmBtn.addEventListener("click", this._confirmHandler);
    }
  }

  setConfirmEnabled(enabled, textWhenEnabled = "Confirm / Continue", textWhenDisabled = "Locked — cannot confirm") {
    if (!this.confirmBtn) return;
    this.confirmBtn.disabled = !enabled;
    this.confirmBtn.textContent = enabled ? textWhenEnabled : textWhenDisabled;
  }
}