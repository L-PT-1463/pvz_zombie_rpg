import Renderer from "./Renderer.js";
import AvatarSelectState from "./states/AvatarSelectState.js";

export default class Game {
    constructor() {
        this.renderer = new Renderer();

        this.lastTime = 0;
        this.deltaTime = 0;
        this.running = false;

        this.currentState = null;
    }

    start() {
        this.changeState(new AvatarSelectState(this));
        this.running = true;
        requestAnimationFrame((t) => this.loop(t));
    }

    changeState(newState) {
        if (this.currentState && typeof this.currentState.destroy === "function") {
            this.currentState.destroy();
        }
        this.currentState = newState;
    }

    loop(timestamp) {
        if (!this.running) return;

        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        if (this.currentState) {
            this.currentState.update(this.deltaTime);
            this.currentState.render(this.renderer);
        }

        requestAnimationFrame((t) => this.loop(t));
    }
}