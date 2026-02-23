export default class Renderer {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.resize();
        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;

        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    fillRect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }
}