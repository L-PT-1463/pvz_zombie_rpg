import AvatarSelectState from "./AvatarSelectState.js";
import AssetLoader from "../../assets/AssetLoader.js";
import { MODELS } from "../data/models.js";
import Player from "../entities/Player.js";
import SaveSystem from "../storage/SaveSystem.js";
import { UI_MODES } from "../ui/UI_MODES.js";
import { UI_EVENTS } from "../ui/UI_EVENTS.js";

const DEFAULT_PLAYER = { modelId: "browncoat", color: "#FF6600" };

const GRID = {
  lanes: 3,
  cols: 9,
  cellSize: 90,
  cellGap: 6,
  borderRadius: 10,
};

const CELL_COLORS = {
  base: "#0b0b0b",
  playerZone: "#3a1b4f",
  neutral: "#000000",
  enemyZone: "#123b1f",
  border: "#ffffff",
  background: "#101010",
};

export default class FightingGardenState {
  constructor(game, playerProfile) {
    this.game = game;
    this.unsubs = [];

    // --- UI mode ---
    this.game.ui.setMode(UI_MODES.GARDEN);

    // --- Load profile (settings + avatar + unlocks) ---
    this.profile = SaveSystem.loadProfile();

    // Use provided profile (from AvatarSelect) OR fallback to saved profile avatar
    this.playerProfile = playerProfile ?? this.profile.avatar;

    // Safety fallback if save is weird/corrupt
    if (!this.playerProfile || !this.playerProfile.modelId) {
      this.playerProfile = { ...DEFAULT_PLAYER };
    }

    // --- Load or create current run save ---
    this.run = SaveSystem.loadRun();

    // If no run exists yet, create one from profile
    if (!this.run.startedAt) {
      this.run = SaveSystem.newRunFromProfile(this.profile);
      SaveSystem.saveRun(this.run);
    }

    // Ensure run has avatar info
    this.run.player.modelId = this.playerProfile.modelId;
    this.run.player.color = this.playerProfile.color;

    // --- Assets + player creation ---
    this.assets = new AssetLoader();

    // Find model definition for the selected avatar
    this.modelDef = this.getModelDef(this.playerProfile.modelId);

    // Create player
    this.player = new Player(this.playerProfile, this.modelDef, this.assets);

    // Apply run -> player (run is the source of truth for live state)
    this.player.lane = this.run.player.lane ?? 1;
    this.player.col = this.run.player.col ?? 0;
    this.player.hp = this.run.player.hp ?? 100;
    this.player.maxHP = this.run.player.maxHP ?? 100;

    // --- Grid definition ---
    this.lanes = GRID.lanes;
    this.cols = GRID.cols;

    // Visual sizing
    this.cellSize = GRID.cellSize;
    this.cellGap = GRID.cellGap;
    this.borderRadius = GRID.borderRadius;

    // --- Autosave when tab is hidden / user leaves ---
    this.onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        this.game.requestRunSave("visibilitychange");
      }
    };
    document.addEventListener("visibilitychange", this.onVisibilityChange);

    // --- UI events via bus ---
    this.unsubs.push(
      this.game.uiBus.on(UI_EVENTS.BACK_TO_AVATAR, () => {
        this.game.changeState(() => new AvatarSelectState(this.game));
      })
    );
  }

  update(dt) {
    // later: handle player position, input, enemies, etc.
  }

  render(renderer) {
    renderer.clear();
    renderer.fillRect(0, 0, renderer.width, renderer.height, CELL_COLORS.background);

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

        const colNumber = c + 1;
        const color = this.getCellColor(colNumber);

        renderer.fillRect(x, y, this.cellSize, this.cellSize, color);

        // subtle grid border
        renderer.ctx.save();
        renderer.ctx.globalAlpha = 0.35;
        renderer.ctx.strokeStyle = CELL_COLORS.border;
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

  getRunSnapshot() {
    // Make sure this.run reflects the latest world values before saving.
    this.captureRunFromWorld();
    return this.run;
  }

  getCellRect(renderer, startX, startY, r, c) {
    const x = startX + c * (this.cellSize + this.cellGap);
    const y = startY + r * (this.cellSize + this.cellGap);
    return { x, y, w: this.cellSize, h: this.cellSize };
  }

  getModelDef(modelId) {
    return MODELS.find((m) => m.id === modelId) || MODELS[0];
  }

  getCellColor(colNumber) {
    // 1-3 = player spawn area (purple)
    // 4   = neutral column (black)
    // 5-9 = enemy area (green)
    if (colNumber >= 1 && colNumber <= 3) return CELL_COLORS.playerZone;
    if (colNumber === 4) return CELL_COLORS.neutral;
    return CELL_COLORS.enemyZone;
  }

  destroy() {
    // Unsubscribe bus listeners
    for (const off of this.unsubs) off();
    this.unsubs = [];

    document.removeEventListener("visibilitychange", this.onVisibilityChange);

    this.game.requestRunSave("state-exit");
  }
}