const STORAGE_KEY = "zombieRPG_Save_v1";

const DEFAULT_SAVE = {
  version: 1,
  avatar: {
    modelId: "browncoat",
    color: "#FF6600"
  },
  unlocks: {
    // model IDs: true/false
    browncoat: true,
    // others will default to false if missing
  }
};

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default class SaveManager {
  static load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_SAVE);

    const parsed = safeParse(raw);
    if (!parsed || typeof parsed !== "object") return structuredClone(DEFAULT_SAVE);

    // Minimal merge for forward compatibility
    const save = structuredClone(DEFAULT_SAVE);

    if (typeof parsed.version === "number") save.version = parsed.version;

    if (parsed.avatar) {
      if (typeof parsed.avatar.modelId === "string") save.avatar.modelId = parsed.avatar.modelId;
      if (typeof parsed.avatar.color === "string") save.avatar.color = parsed.avatar.color;
    }

    if (parsed.unlocks && typeof parsed.unlocks === "object") {
      save.unlocks = { ...save.unlocks, ...parsed.unlocks };
    }

    return save;
  }

  static save(saveObj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveObj));
  }

  static reset() {
    localStorage.removeItem(STORAGE_KEY);
  }
}