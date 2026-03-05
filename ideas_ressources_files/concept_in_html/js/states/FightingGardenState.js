import AvatarSelectState from "./AvatarSelectState.js";
import AssetLoader from "../../assets/AssetLoader.js";
import { MODELS } from "../data/models.js";
import Player from "../entities/Player.js";
import SaveSystem from "../storage/SaveSystem.js";

export default class FightingGardenState {
  constructor(game, playerProfile) {
    this.game = game;

    // --- Load profile (settings + avatar + unlocks) ---
    // This replaces the old SaveManager for long-term structure.
    this.profile = SaveSystem.loadProfile();

    // Use provided profile (from AvatarSelect) OR fallback to saved profile avatar
    this.playerProfile = playerProfile ?? this.profile.avatar;

    // Safety fallback if save is weird/corrupt
    if (!this.playerProfile || !this.playerProfile.modelId) {
      this.playerProfile = { modelId: "browncoat", color: "#FF6600" };
    }

    // --- Load or create current run save ---
    this.run = SaveSystem.loadRun();

    // If no run exists yet, create one from profile
    if (!this.run.startedAt) {
      this.run = SaveSystem.newRunFromProfile(this.profile);
      SaveSystem.saveRun(this.run);
    }

    // Ensure run has avatar info (in case we entered garden via AvatarSelect)
    this.run.player.modelId = this.playerProfile.modelId;
    this.run.player.color = this.playerProfile.color;

    // --- Assets + player creation ---
    this.assets = new AssetLoader();

    // Find model definition for the selected avatar
    this.modelDef = MODELS.find(m => m.id === this.playerProfile.modelId) || MODELS[0];

    // Create player (defaults to lane 2 col 1 inside Player)
    this.player = new Player(this.playerProfile, this.modelDef, this.assets);

    // Apply run -> player (run is the source of truth for live state)
    this.player.lane = this.run.player.lane ?? 1;
    this.player.col = this.run.player.col ?? 0;
    this.player.hp = this.run.player.hp ?? 100;
    this.player.maxHP = this.run.player.maxHP ?? 100;

    // --- Grid definition ---
    this.lanes = 3;
    this.cols = 9;

    // Visual sizing
    this.cellSize = 90;
    this.cellGap = 6;
    this.borderRadius = 10;

    this.setupUI();
  }

  setupUI() {
    this.game.ui.setMode("garden");

    // Back handler
    this.game.ui.setBackHandler(() => {
      this.game.changeState(() => new AvatarSelectState(this.game));
    });

    // Manual save button
    this.game.ui.setSaveHandler(() => this.saveNow("manual"));

    // Autosave when tab is hidden / user leaves
    this.onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        this.saveNow("visibilitychange");
      }
    };
    document.addEventListener("visibilitychange", this.onVisibilityChange);

    // Export
    this.game.ui.setExportHandler(() => {
      this.saveNow("pre-export");

      const data = SaveSystem.exportAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      a.download = `fighting-gardens-save_${stamp}.json`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });

    // Import (UIController handles file picking + parsing)
    this.game.ui.setImportPayloadHandler((payload) => {
      SaveSystem.importAll(payload);
      location.reload(); // still simplest/safest for now
    });

  }

  update(dt) {
    // later: handle player position, input, enemies, etc.
  }

  render(renderer) {
    renderer.clear();
    renderer.fillRect(0, 0, renderer.width, renderer.height, "#101010");

    const gridW = this.cols * this.cellSize + (this.cols - 1) * this.cellGap;
    const gridH = this.lanes * this.cellSize + (this.lanes - 1) * this.cellGap;

    // Centered grid
    const startX = (renderer.width - gridW) / 2;
    const startY = (renderer.height - gridH) / 2;

    // Draw cells
    for (let r = 0; r < this.lanes; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = startX + c * (this.cellSize + this.cellGap);
        const y = startY + r * (this.cellSize + this.cellGap);

        // Columns are 1-9 in your description; c is 0-8
        const colNumber = c + 1;

        // 1-3 = purple spawn area
        // 4 = black neutral column
        // 5-9 = green enemy area
        let color = "#0b0b0b";
        if (colNumber >= 1 && colNumber <= 3) color = "#3a1b4f";      // purple
        else if (colNumber === 4) color = "#000000";                  // black
        else color = "#123b1f";                                       // green

        // draw cell
        renderer.fillRect(x, y, this.cellSize, this.cellSize, color);

        // subtle grid border
        renderer.ctx.save();
        renderer.ctx.globalAlpha = 0.35;
        renderer.ctx.strokeStyle = "#ffffff";
        renderer.ctx.lineWidth = 2;
        renderer.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
        renderer.ctx.restore();
      }
    }

    // --- Draw player ---
    const playerCell = this.getCellRect(renderer, startX, startY, this.player.lane, this.player.col);
    this.player.render(renderer, playerCell);

    // Tiny debug label
    renderer.ctx.save();
    renderer.ctx.globalAlpha = 0.85;
    renderer.ctx.fillStyle = "white";
    renderer.ctx.font = "16px sans-serif";
    renderer.ctx.fillText(
      `Fighting Garden (3x9) | Player: ${this.playerProfile?.modelId ?? "?"} ${this.playerProfile?.color ?? ""}`,
      20,
      30
    );
    renderer.ctx.restore();
  }

  //----- helper methods -------
  captureRunFromWorld() {
    // take current world state and write into this.run
    this.run.player.lane = this.player.lane;
    this.run.player.col = this.player.col;
    this.run.player.hp = this.player.hp;
    this.run.player.maxHP = this.player.maxHP;

    // Keep avatar info too (handy if you later load run directly)
    this.run.player.modelId = this.playerProfile.modelId;
    this.run.player.color = this.playerProfile.color;

    SaveSystem.stamp(this.run);
  }

  saveNow(reason = "manual") {
    this.captureRunFromWorld();
    SaveSystem.saveRun(this.run);
    console.log(`Saved run (${reason})`, this.run.updatedAt);
  }

  getCellRect(renderer, startX, startY, r, c) {
    const x = startX + c * (this.cellSize + this.cellGap);
    const y = startY + r * (this.cellSize + this.cellGap);
    return { x, y, w: this.cellSize, h: this.cellSize };
  }

  destroy() {
    this.game.ui.clearHandlers();

    document.removeEventListener("visibilitychange", this.onVisibilityChange);

    this.saveNow("state-exit");
  }
}