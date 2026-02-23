import Renderer from "./Renderer.js";

export default class Game {
    constructor() {
        this.renderer = new Renderer();

        this.lastTime = 0;
        this.deltaTime = 0;

        this.running = false;
    }

    start() {
        this.running = true;
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(timestamp) {
        if (!this.running) return;

        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(this.deltaTime);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        // Game logic will live here
    }

    render() {
        this.renderer.clear();

        // Temporary visual test
        this.renderer.fillRect(0, 0, this.renderer.width, this.renderer.height, "#222");
        this.renderer.fillRect(200, 200, 150, 150, "red");
    }
}