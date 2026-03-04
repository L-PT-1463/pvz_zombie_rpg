import AvatarSelectState from "./AvatarSelectState.js";

export default class FightingGardenState {
  constructor(game, playerProfile) {
    this.game = game;

    // playerProfile example:
    // { modelId: "browncoat", color: "#ff00aa" }
    this.playerProfile = playerProfile;

    this.lanes  = 3;
    this.cols   = 9;

    // Visual sizing
    this.cellSize       = 90;
    this.cellGap        = 6;
    this.borderRadius   = 10;

    this.setupUI();
  }

  setupUI() {
    // Put UI in the correct mode for this state
    this.game.ui.showGardenUI();

    // Back button handler owned by UIController
    this.game.ui.setBackHandler(() => {
      this.game.changeState(new AvatarSelectState(this.game));
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

  destroy() {
    // Prevent handler stacking
    this.game.ui.setBackHandler(null);
  }
}