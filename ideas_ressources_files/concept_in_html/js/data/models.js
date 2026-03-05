const AVATAR_ASSET_DIR = "assets/avatars/";
const DEFAULT_AVATAR_COLOR = "#FF6600";

const sprite = (name) => ({
  base: `${AVATAR_ASSET_DIR}${name}_base.png`,
  color: `${AVATAR_ASSET_DIR}${name}_color.png`,
});

export function getModelById(id) {
  return MODELS.find(m => m.id === id) || MODELS[0];
}

export const MODELS = [
  {
    id: "browncoat",
    displayName: "Browncoat",
    recolorPartName: "Tie",
    sprites: sprite("browncoat"),
  },
  {
    id: "beach",
    displayName: "Beach Bum",
    recolorPartName: "Shorts",
    locked: true,
    unlockHint: "Unlocked in the Pirate's Beach area by beating a Docked Ship boss garden for the first time.",
    sprites: sprite("beach"),
  },
  {
    id: "carnie",
    displayName: "Carnie-man",
    recolorPartName: "...",
    locked: true,
    unlockHint: "Unlocked in the Neon Carnival area by beating it for the first time.",
    sprites: sprite("browncoat"), // (still using browncoat art for now)
  },
  {
    id: "employee_of_the_week",
    displayName: "Employee of the Week",
    recolorPartName: "...",
    locked: true,
    unlockHint: "Unlocked in the ZCorp Intra-Space-Time area by beating it for the first time.",
    sprites: sprite("zcorp"),
  },
  {
    id: "fancycoat",
    displayName: "Fancycoat",
    recolorPartName: "Bowtie",
    locked: true,
    unlockHint: "Unlocked in the Steam City area by obtaining all gentleman almanac entries.",
    sprites: sprite("fancycoat"),
  },
  {
    id: "mummy",
    displayName: "Modern Mummy",
    recolorPartName: "Pyramid Tie",
    locked: true,
    unlockHint: "Unlocked in the Old Wild Egypt area by beating it for the first time.",
    sprites: sprite("mummy"),
  },
  {
    id: "training",
    displayName: "Training Bandana",
    recolorPartName: "Bandana",
    locked: true,
    unlockHint: "Unlocked in the Training Grounds area by beating it for the first time.",
    sprites: sprite("training"),
  },
  {
    id: "crew",
    displayName: "Part of the Crew",
    recolorPartName: "...",
    locked: true,
    unlockHint: "Unlocked in the Pirate's Beach area by beating a Marine Battle boss garden for the first time.",
    sprites: sprite("beach"),
  },
  {
    id: "prized_employee",
    displayName: "Prized Employee",
    recolorPartName: "...",
    locked: true,
    unlockHint: "Unlocked in the ZCorp Intra-Space-Time area by vanquishing a ZCorp New Hire.",
    sprites: sprite("zcorp"),
  },
  {
    id: "hunter",
    displayName: "Relic Hunter",
    recolorPartName: "...",
    locked: true,
    unlockHint: "Inspired by the Lost City area, unlocked by obtaining all the relics' almanac entries.",
    sprites: sprite("browncoat"),
  },
  {
    id: "snow",
    displayName: "Snow Day",
    recolorPartName: "Beanie",
    locked: true,
    unlockHint: "Inspired by the Neighbour's House area, unlocked by obtaining all winter almanac entries.",
    sprites: sprite("winter"),
  },
].map((m) => ({
  defaultColor: DEFAULT_AVATAR_COLOR,
  ...m,
}));