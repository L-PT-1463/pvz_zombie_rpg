import SaveSystem from "./SaveSystem.js";
import { UI_EVENTS } from "../ui/UI_EVENTS.js";

export default class SaveIOController {
  constructor(game) {
    this.game = game;
    this.unsubs = [];

    // EXPORT is global: always exports profile+run
    this.unsubs.push(
      this.game.uiBus.on(UI_EVENTS.EXPORT, () => {
        const data = SaveSystem.exportAll();
        SaveSystem.downloadJSON(data, "fighting-gardens-save");
      })
    );

    // IMPORT is global: always writes profile+run then reloads
    this.unsubs.push(
      this.game.uiBus.on(UI_EVENTS.IMPORT_PAYLOAD, ({ payload }) => {
        SaveSystem.importAll(payload);
        location.reload(); // rehydrate everything from storage
      })
    );
  }

  destroy() {
    for (const off of this.unsubs) off();
    this.unsubs = [];
  }
}