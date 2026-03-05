import { tintWhiteSprite } from "../rendering/tint.js";

export default class Player {
    constructor(profile, modelDef, assetLoader) {
        this.profile = profile;     // { modelId, color }
        this.modelDef = modelDef;   // entry from MODELS
        this.assets = assetLoader;

        // Grid position (0-indexed)
        this.lane = 1; // lane 2
        this.col = 0; // col 1

        // HP
        this.maxHP = 100;
        this.hp = 100;

        // Queue sprites
        this.baseKey = `${this.modelDef.id}_base`;
        this.colorKey = `${this.modelDef.id}_color`;

        this.assets.loadImage(this.baseKey, this.modelDef.sprites.base);
        this.assets.loadImage(this.colorKey, this.modelDef.sprites.color);
    }

    render(renderer, cellRect) {
        const baseImg = this.assets.getImage(this.baseKey);
        const colorImg = this.assets.getImage(this.colorKey);

        // If not loaded yet, draw a placeholder
        if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) {
            renderer.fillRect(cellRect.x + 10, cellRect.y + 10, cellRect.w - 20, cellRect.h - 20, "#666");
            return;
        }

        // --- Layout constants ---
        const paddingX = 8;
        const hpBarHeight = 10;
        const hpBarGap = 8;

        // HP bar anchored near the bottom of the cell
        const barW = cellRect.w * 0.75;
        const barX = cellRect.x + (cellRect.w - barW) / 2;
        const barY = cellRect.y + cellRect.h - hpBarHeight - 8;

        // "Feet line" = top of the HP bar minus a gap
        const feetY = barY - hpBarGap;

        // --- Sprite sizing rule ---
        // Fill horizontally (within padding), keep aspect ratio.
        const targetW = cellRect.w - paddingX * 2;
        const scale = targetW / baseImg.width;

        const drawW = baseImg.width * scale;
        const drawH = baseImg.height * scale;

        const drawX = cellRect.x + (cellRect.w - drawW) / 2;

        // Anchor sprite bottom to feetY. If too tall, it will overflow upward (desired).
        const drawY = feetY - drawH;

        // Draw base
        renderer.drawImage(baseImg, drawX, drawY, drawW, drawH);

        // Draw tinted overlay (if present)
        if (colorImg && colorImg.complete && colorImg.naturalWidth !== 0) {
            const tinted = tintWhiteSprite(colorImg, this.profile.color);
            renderer.drawImage(tinted, drawX, drawY, drawW, drawH);
        }

        // --- HP bar (under the model) ---
        // background
        renderer.fillRect(barX, barY, barW, hpBarHeight, "#111");

        // fill
        const pct = Math.max(0, Math.min(1, this.hp / this.maxHP));
        renderer.fillRect(barX, barY, barW * pct, hpBarHeight, "#e33");

        // border
        renderer.ctx.save();
        renderer.ctx.globalAlpha = 0.5;
        renderer.ctx.strokeStyle = "#fff";
        renderer.ctx.lineWidth = 2;
        renderer.ctx.strokeRect(barX, barY, barW, hpBarHeight);
        renderer.ctx.restore();
    }
}