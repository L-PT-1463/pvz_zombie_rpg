const PROFILE_KEY = "fc_profile_v1"; // settings + avatar + unlocks etc.
const RUN_KEY     = "fc_run_v1";     // current game state (room, enemies, player stats, etc.)

const DEFAULT_PROFILE = {
  version: 1,
  settings: {},
  avatar: { modelId: "browncoat", color: "#FF6600" },
  unlocks: { browncoat: true }
};

const DEFAULT_RUN = {
  version: 1,
  startedAt: null,
  updatedAt: null,

  // Where the player currently is (you’ll expand later)
  areaId: "garden_test",
  roomId: "fg_001",
  difficulty: 1,

  player: {
    lane: 1,
    col: 0,
    hp: 100,
    maxHP: 100,
    modelId: "browncoat",
    color: "#FF6600",
    equipped: {}
  },

  enemies: [],              // later
  spawnlings: [],           // later
  roomState: {}             // later gimmicks
};

function safeParse(raw) {
  try { return JSON.parse(raw); } catch { return null; }
}

function deepClone(obj) {
  return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
}

export default class SaveSystem {
    // ---------- PROFILE ----------
    static loadProfile() {
        const raw = localStorage.getItem(PROFILE_KEY);
        if (!raw) return deepClone(DEFAULT_PROFILE);

        const parsed = safeParse(raw);
        if (!parsed || typeof parsed !== "object") return deepClone(DEFAULT_PROFILE);

        // minimal merge
        const p = deepClone(DEFAULT_PROFILE);
        if (typeof parsed.version === "number") p.version = parsed.version;

        if (parsed.settings && typeof parsed.settings === "object") p.settings = { ...p.settings, ...parsed.settings };
        if (parsed.avatar && typeof parsed.avatar === "object") {
        if (typeof parsed.avatar.modelId === "string") p.avatar.modelId = parsed.avatar.modelId;
        if (typeof parsed.avatar.color === "string") p.avatar.color = parsed.avatar.color;
        }
        if (parsed.unlocks && typeof parsed.unlocks === "object") p.unlocks = { ...p.unlocks, ...parsed.unlocks };

        return p;
    }

    static saveProfile(profile) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }

    // ---------- RUN ----------
    static loadRun() {
        const raw = localStorage.getItem(RUN_KEY);
        if (!raw) return deepClone(DEFAULT_RUN);

        const parsed = safeParse(raw);
        if (!parsed || typeof parsed !== "object") return deepClone(DEFAULT_RUN);

        // minimal merge
        const r = deepClone(DEFAULT_RUN);
        if (typeof parsed.version === "number") r.version = parsed.version;

        for (const k of ["startedAt", "updatedAt", "areaId", "roomId", "difficulty"]) {
        if (parsed[k] !== undefined) r[k] = parsed[k];
        }

        if (parsed.player && typeof parsed.player === "object") {
        r.player = { ...r.player, ...parsed.player };
        }

        if (Array.isArray(parsed.enemies)) r.enemies = parsed.enemies;
        if (Array.isArray(parsed.spawns)) r.spawns = parsed.spawns;
        if (parsed.roomState && typeof parsed.roomState === "object") r.roomState = parsed.roomState;

        return r;
    }

    static saveRun(run) {
        localStorage.setItem(RUN_KEY, JSON.stringify(run));
    }

    static newRunFromProfile(profile) {
        const run = deepClone(DEFAULT_RUN);
        const now = new Date().toISOString();
        run.startedAt = now;
        run.updatedAt = now;

        run.player.modelId = profile.avatar.modelId;
        run.player.color = profile.avatar.color;

        return run;
    }

    // ---------- Helpers ----------
    static stamp(run) {
        run.updatedAt = new Date().toISOString();
        return run;
    }

    static resetProfile() {
        localStorage.removeItem("fc_profile_v1");
    }
    static resetRun() {
        localStorage.removeItem("fc_run_v1");
    }

    static exportAll() {
        const payload = {
            meta: {
            format: "fighting-gardens-save",
            exportedAt: new Date().toISOString(),
            profileKey: "fc_profile_v1",
            runKey: "fc_run_v1"
            },
            profile: this.loadProfile(),
            run: this.loadRun()
        };

        return payload;
    }

    static importAll(payload) {
        // Very light validation (enough to prevent trash writes)
        if (!payload || typeof payload !== "object") throw new Error("Invalid save file (not an object).");
        if (!payload.profile || typeof payload.profile !== "object") throw new Error("Invalid save file (missing profile).");
        if (!payload.run || typeof payload.run !== "object") throw new Error("Invalid save file (missing run).");

        // Write raw; loadProfile/loadRun already merge defaults later
        localStorage.setItem("fc_profile_v1", JSON.stringify(payload.profile));
        localStorage.setItem("fc_run_v1", JSON.stringify(payload.run));
    }
}