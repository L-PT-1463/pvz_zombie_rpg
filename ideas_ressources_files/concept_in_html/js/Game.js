import Renderer from "./Renderer.js";
import AvatarSelectState from "./states/AvatarSelectState.js";
import FightingGardenState from "./states/FightingGardenState.js";
import UIBus from "./ui/UI_BUS.js";
import UIController from "./ui/UIController.js";
import SaveSystem from "./storage/SaveSystem.js";
import SaveIOController from "./storage/SaveIOController.js";

export default class Game {
    constructor() {
        this.uiBus      = new UIBus();
        this.ui         = new UIController(this.uiBus);

        // Global save import/export wiring
        this.saveIO     = new SaveIOController(this);

        this.renderer   = new Renderer();

        this.lastTime = 0;
        this.deltaTime = 0;
        this.running = false;

        this.currentState = null;
    }

    start() {
        //this.changeState(new AvatarSelectState(this));
        this.changeState(new FightingGardenState(this));
        this.running = true;
        requestAnimationFrame((t) => this.loop(t));
    }

    changeState(next) {
        if (this.currentState && typeof this.currentState.destroy === "function") {
            this.currentState.destroy();
        }

        // Allow passing a factory to delay construction until after destroy()
        this.currentState = (typeof next === "function") ? next() : next;
    }

    requestRunSave(reason = "manual") {
        const state = this.currentState;

        // Only states that contain a run should implement this.
        if (!state || typeof state.getRunSnapshot !== "function") {
            console.warn(`[SAVE] Current state has no run to save (reason: ${reason}).`);
            return false;
        }

        const runSnapshot = state.getRunSnapshot();
        if (!runSnapshot) {
            console.warn(`[SAVE] getRunSnapshot() returned nothing (reason: ${reason}).`);
            return false;
        }

        SaveSystem.saveRun(runSnapshot);
        console.log(`Saved run (${reason})`, runSnapshot.updatedAt);

        return true;
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