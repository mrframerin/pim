// Sprite art, palettes, and physics constants for the "ntn run" pixel-art
// canvas game (rendered by ./AgentRunGame.tsx).
//
// Each sprite is a pixel map: { w, h, rows } where rows[y] is a string of length w
// and each char is a palette key (" " = transparent). The bake() helper in
// AgentRunGame fills one rect per non-transparent cell at an integer scale.

export type SpriteDef = { w: number; h: number; rows: string[] }; // rows[y] is a string of length w; each char is a palette key or " " for transparent

// Base palette (source identifier: o)
export const PALETTE: Record<string, string> = {
  B: "#cbcbf2",
  H: "#e0e0f7",
  S: "#a2a2e8",
  G: "#3838cc",
  C: "#59a3e4",
  W: "#74aee3",
  D: "#4986bd",
  A: "#0000aa",
  N: "#7474ea",
  E: "#ffffff",
  O: "#000076",
  K: "#000000",
  P: "#ce259e",
  L: "#cc7dd6",
  Q: "#6262cb",
  R: "#abb5dc",
  T: "#333385",
  U: "#6a6ada",
};

// Title variant (source identifier: l) — o but B overridden to white
export const TITLE_PALETTE: Record<string, string> = {
  ...PALETTE,
  B: "#ffffff",
};

// Cloud variant (source identifier: s) — o with W/C/D overridden
export const CLOUD_PALETTE: Record<string, string> = {
  ...PALETTE,
  W: "#f6f5f4",
  C: "#ffffff",
  D: "#dfdcd9",
};

// player faces, in chunk render order: p, g, y (each 16x17)
export const FACES: SpriteDef[] = [
  // p
  {
    w: 16,
    h: 17,
    rows: [
      "      BBBB      ",
      "    BBBBBBBB    ",
      "  BBBGGGGGGBBB  ",
      "  BBGBBBBBBGBB  ",
      " BBGBBBBBBBBGBB ",
      " BGBBBBBGBGBBGB ",
      "BBGBBBBBGBGBBGBB",
      "BBGBBBBBBBBBBGBB",
      "BBGBBBBBBBBBBGBB",
      "BBBGBBBBBBBBGBBB",
      "SBBBGBBBBBBGBBBB",
      " BBBBGBBGGGBBBBS",
      " SBBBGBGBBBBBBS ",
      "  BBBGGBBBBBBB  ",
      "  SSBBBBBBBBSS  ",
      "    SBBBBBBS    ",
      "     SSSSSS     ",
    ],
  },
  // g
  {
    w: 16,
    h: 17,
    rows: [
      "      BBBB      ",
      "    BBBBBBBB    ",
      "  BBBGGGGGGBBB  ",
      "  BBGBBBBBBGBB  ",
      " BBGBBBBBBBBGBB ",
      " BGBBBBBGBGBBGB ",
      "BBGBBBBBGBGBBGBB",
      "BBGBBBBBBBBBBGBB",
      "BBGBBBBBBBBBBGBB",
      "BBBGBBBBBBBBGBBB",
      "SBBBGBBBBBBGBBBB",
      " BBBBGBBBBGBBBBS",
      " SBBBBGGGGBBBBS ",
      "  BBBBGBBGBBBB  ",
      "  SSBBGGGGBBSS  ",
      "    SBBBBBBS    ",
      "     SSSSSS     ",
    ],
  },
  // y
  {
    w: 16,
    h: 17,
    rows: [
      "      BBBB      ",
      "    BBBBGGBB    ",
      "  BBBBBGBGGBBB  ",
      "  BBBBBGGBBBBB  ",
      " BBBGGGGBGGGBBB ",
      " BBGBBBGGBBBGBB ",
      "BBGBBBBBBBBBBGBB",
      "BBGBBBBGBGBBBGBB",
      "BBGBBBBGBGBBBGBB",
      "BBGBBBBBBBBBBGBB",
      "SBGBBBBBBBBBBGBB",
      " BGBBBBBBBBBBGBS",
      " SBGBBBBBBBBGBS ",
      "  BBGBBGGBBGBB  ",
      "  SSBGGBBGGBSS  ",
      "    SBBBBBBS    ",
      "     SSSSSS     ",
    ],
  },
];

// obstacle icon set (source identifier: u). Keys preserved verbatim; order = Object.keys(u).
export const OBSTACLES: Record<string, SpriteDef> = {
  h1: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGGGGGGBBGBBBS",
      "HBBGBBBBGBGGBBBS",
      "HBBGBBBBGBBGBBBS",
      "HBBGBBBBGBBGBBBS",
      "HBBGBBBBGBBGBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  h2: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGGGGGGBGGBBBS",
      "HBBGBBBBGBBBGBBS",
      "HBBGBBBBGBBGBBBS",
      "HBBGBBBBGBGBBBBS",
      "HBBGBBBBGBGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  h3: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGGGGGGBGGBBBS",
      "HBBGBBBBGBBBGBBS",
      "HBBGBBBBGBBGGBBS",
      "HBBGBBBBGBBBGBBS",
      "HBBGBBBBGBGGBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  h4: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGBBBBGBBBBBBS",
      "HBBGGGGGGBGBGBBS",
      "HBBGBBBBGBGBGBBS",
      "HBBGBBBBGBGGBBBS",
      "HBBGBBBBGBBBGBBS",
      "HBBGBBBBGBBBGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  calendar: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGGGGGGGGGBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGGGGGGGGGBBBS",
      "HBBGGGBGBGBGBBBS",
      "HBBGGGGGGGGGBBBS",
      "HBBGBGBGBGBGBBBS",
      "HBBGGGGGGGGGBBBS",
      "HBBGBGBGBGGGBBBS",
      "HBBGGGGGGGGGBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  check: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGGGGGGGGGGBBS",
      "HBBGGGGGGGGGGBBS",
      "HBBGGGGGGGBGGBBS",
      "HBBGGGGGGBGGGBBS",
      "HBBGGGGGBGGGGBBS",
      "HBBGGBGGBGGGGBBS",
      "HBBGGGBGBGGGGBBS",
      "HBBGGGGBGGGGGBBS",
      "HBBGGGGGGGGGGBBS",
      "HBBGGGGGGGGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  code: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBGBBBBGBBBBS",
      "HBBBGBBBBBBGBBBS",
      "HBBGBBBBBBBBGBBS",
      "HBBBGBBBBBBGBBBS",
      "HBBBBGBBBBGBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  formula: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBGGGGGGBBBBS",
      "HBBBBGBBBBBBBBBS",
      "HBBBBBGBBBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBBBGBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBGBBBBBBBBS",
      "HBBBBGBBBBBBBBBS",
      "HBBBBGGGGGGBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  list: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBGGGGGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBGGGGGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBGGGGGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  number: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBBBBBBBBBBS",
      "HBBBGBBBBBBBBBBS",
      "HBBBGBGGGGGGGBBS",
      "HBBBGBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGBBBBBBBBBBBS",
      "HBBBGBBBBBBBBBBS",
      "HBBGBBGGGGGGGBBS",
      "HBBGGBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  page: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBGGGBGBBBBBBS",
      "HBBBGGGBGGBBBBBS",
      "HBBBGGGBGGGBBBBS",
      "HBBBGGGGBGGGBBBS",
      "HBBBGGGGGBBBBBBS",
      "HBBBGGGGGGGGBBBS",
      "HBBBGGBBBBGGBBBS",
      "HBBBGGGGGGGGBBBS",
      "HBBBGGBBBBGGBBBS",
      "HBBBGGGGGGGGBBBS",
      "HBBBGGGGGGGGBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  quote: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBGBBBBGBBBS",
      "HBBBBGBBBBGBBBBS",
      "HBBBGBBBBGBBBBBS",
      "HBBBGGGBBGGGBBBS",
      "HBBBGGGBBGGGBBBS",
      "HBBBGGGBBGGGBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  text: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBGGGGGGGGGBBBS",
      "HBBGBBBGBBBGBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBGGGBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  "meeting-notes": {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBGGGBBBBBBS",
      "HBBBBGGGGGBBBBBS",
      "HBBBBGGGGGBBBBBS",
      "HBBBBGGGGGBBBBBS",
      "HBBBBGGGGGBBBBBS",
      "HBBBBGGGGGBBBBBS",
      "HBBGBBGGGBBGBBBS",
      "HBBBGBBBBBGBBBBS",
      "HBBBBGGGGGBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBBBGBBBBBBBS",
      "HBBBBGGGGGBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  database: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBGGGGGBGGGGGBBS",
      "HBGGGGGBGGGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBGGGGGBGGGGGBBS",
      "HBGGGGGBGGGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBGGGGGBGGGGGBBS",
      "HBGGGGGBGGGGGBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
  todo: {
    w: 16,
    h: 16,
    rows: [
      "HHHHHHHHHHHHHHHH",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBGBBBBBBBBBS",
      "HBBBGBBBBBBBBBBS",
      "HBGBGBGGGGGGGBBS",
      "HBBGBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBGGGBBBBBBBBBBS",
      "HBGBGBGGGGGGGBBS",
      "HBGGGBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "HBBBBBBBBBBBBBBS",
      "SSSSSSSSSSSSSSSS",
    ],
  },
};

// cloud (source identifier: f), 16x16, uses CLOUD_PALETTE
export const CLOUD: SpriteDef = {
  w: 16,
  h: 16,
  rows: [
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "   WCD          ",
    "  WCCCCCCCD     ",
    " WCCCCCCCCCCCD  ",
    "WCCCCCCCCCCCCCD ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
};

// agent blink frames. Defined in chunk as m and x (each 16x16). In source:
//   V.current = b(m)  -> shown during the brief blink window (cycle >= 3)
//   J.current = b(x)  -> shown the rest of the time (base/open-eyes frame)
// Kept here in chunk definition order: [m, x].
export const AGENT_FRAMES: SpriteDef[] = [
  // m (blink/closed frame)
  {
    w: 16,
    h: 16,
    rows: [
      "      BBBB      ",
      "    BBBBBBBB    ",
      "  BBBBBBBBBBBB  ",
      "  BBGGGBBGGGBB  ",
      " BBGBBBBGBBBGBB ",
      " BBBBBBGBBBBBBB ",
      "BBBBGGBGBGGBBBBB",
      "BBBBBBGBBBBBBBBB",
      "BBBBBGBBBBBBBBBB",
      "BBBBBGBBBBBBBBBB",
      " BBBGBBBBBBBBBBB",
      " SBBBGGGBBBBBBS ",
      "  BBBBBBBBBBBB  ",
      "  SBBBBBBBBBBS  ",
      "    SBBBBBBS    ",
      "     SSSSSS     ",
    ],
  },
  // x (base/open-eyes frame)
  {
    w: 16,
    h: 16,
    rows: [
      "      BBBB      ",
      "    BBBBBBBB    ",
      "  BBBBBBBBBBBB  ",
      "  BBGGGBBGGGBB  ",
      " BBGBBBBGBBBGBB ",
      " BBBBGBGBBGBBBB ",
      "BBBBBGBGBBGBBBBB",
      "BBBBBBGBBBBBBBBB",
      "BBBBBGBBBBBBBBBB",
      "BBBBBGBBBBBBBBBB",
      " BBBGBBBBBBBBBBB",
      " SBBBGGGBBBBBBS ",
      "  BBBBBBBBBBBB  ",
      "  SBBBBBBBBBBS  ",
      "    SBBBBBBS    ",
      "     SSSSSS     ",
    ],
  },
];

// spark (source identifier: h), 20x8
export const SPARK: SpriteDef = {
  w: 20,
  h: 8,
  rows: [
    "         BB         ",
    "         BB         ",
    "BB       BB       BB",
    "BB       BB       BB",
    "  BB     BB     BB  ",
    "  BB     BB     BB  ",
    "    BB        BB    ",
    "    BB        BB    ",
  ],
};

// coin pickup (source identifier: d), 16x16
export const COIN_PICKUP: SpriteDef = {
  w: 16,
  h: 16,
  rows: [
    "     BBBSSS     ",
    "    BBBBBSSS    ",
    "  BBBBBBBBBSSS  ",
    "  BBBBBBBBBSSS  ",
    " BBGGBBGGGBBSSS ",
    " BGBBBGBBBGBSSS ",
    "BBBBGBGBGBBBBSSS",
    "BBBBBBGBBBBBBSSS",
    "BBBBBGBBBBBBBSSS",
    "BBBBBGBBBBBBBSSS",
    " BBBGBBBBBBBSSS ",
    " BBBBGGGBBBBSSS ",
    "  BBBBBBBBBSSS  ",
    "  BBBBBBBBBSSS  ",
    "    BBBBBSSS    ",
    "     BBBSSS     ",
  ],
};

// chip (source identifier: w), 16x16
export const CHIP: SpriteDef = {
  w: 16,
  h: 16,
  rows: [
    "    BBBBBBBS    ",
    "   BBGBGBGBBS   ",
    "  BBGGGGGGGBBS  ",
    " BBGBBBBBBBGBBS ",
    "BBGBBBBBBBBBGBBS",
    "BGGBBGGGGGBBGGBS",
    "BBGBBGBGBGBBGBBS",
    "BGGBBGGBGGBBGGBS",
    "BBGBBGBGBGBBGBBS",
    "BGGBBGGGGGBBGGBS",
    "BBGBBBBBBBBBGBBS",
    " BBGBBBBBBBGBBS ",
    "  BBGGGGGGGBBS  ",
    "   BBGBGBGBBS   ",
    "    BBBBBBBS    ",
    "                ",
  ],
};

// title (source identifier: c), 70x16, uses TITLE_PALETTE. Spells "ntn run".
export const TITLE: SpriteDef = {
  w: 70,
  h: 16,
  rows: [
    "                                                                      ",
    "                                                                      ",
    "                                                                      ",
    "                        BBBB                                          ",
    "                        BGGB                                          ",
    "BBBB         BBBBBBBB.BBBGGBBBBBBBBBB         BBBBBBBBBBB.BBBBBBBBBBB.",
    "BGGBB        BGGGGGGBBBGGGGGGBGGGGGGBB        BGGBGGGBGGB.BGGBGGGGGGBB",
    "BBGGBB       BGGBBBGGBBBBGGBBBGGBBBGGB        BGGGBBBBGGB.BGGBGGBBBGGB",
    "SBBGGB       BGGBSBGGBSSBGGBSBGGBSBGGB        BGGBBSSBGGB.BGGBGGBSBGGB",
    "BBGGBB       BGGB.BGGB..BGGB.BGGB.BGGB        BGGBS..BGGBBBGGBGGB.BGGB",
    "BGGBBS       BGGB.BGGB..BGGB.BGGB.BGGB        BGGB...BBGGGGGGBGGB.BGGB",
    "BBBBS        BBBB.BBBB..BBBB.BBBB.BBBB        BBBB...SBBBBBBBBBBB.BBBB",
    "SSSS         SSSS.SSSS..SSSS.SSSS.SSSS        SSSS....SSSSSSSSSSS.SSSS",
    "                                                                      ",
    "                                                                      ",
    "                                                                      ",
  ],
};

// Verbatim numeric constants found in the chunk (for cross-checking the re-implementation).
export const CONSTANTS = {
  gravity: 2300, // coin.vy += 2300 * delta
  jumpVelocity: -760, // coin.vy = -760 on jump
  shortHopCap: -260, // releasing jump caps coin.vy at -260
  initialSpeed: 360, // game.speed starts at 360
  speedRampMax: 280, // speed = 360 + Math.min(280, 0.52 * score)
  speedRampFactor: 0.52, // 0.52 * score added to speed
  scoreDivisor: 42, // score = distance / 42
  spawnTimerInit: 1.35, // initial spawnTimer
  groundBaseline: 246, // coin grounded at y = 246 - height; obstacles y = 246 - S
  groundLineY: 247, // ground stroke line drawn at y = 247
  confettiGravity: 700, // confetti vy += 700 * delta
  agentScaleBonus: 0.65, // set on chip pickup (game.agentScaleBonus = 0.65)
  agentScaleDecay: 2.2, // agentScaleBonus -= 2.2 * delta
  deltaClamp: 0.033, // delta = Math.min(0.033, ...)
  bestScoreKey: "coin-runner-best", // localStorage key
  // -- additional constants observed in the chunk --
  pickupBonus: 50, // scoreBonus += 50 on coin pickup
  chipBonus: 100, // scoreBonus += 100 on chip pickup
  cloudSpeeds: [22, 18, 25], // initial cloud speeds
  flipImpulse: Math.PI / 2, // coin.flip set to PI/2 on jump
  flipSpinRate: 13, // coin.flip += 13 * delta while airborne
  minVisualSquash: 0.16, // min |cos(flip)| used for squash scale
  spinDivisor: 14, // rotation = distance / 14 when grounded
  agentBlinkCycle: 3.15, // BB.current wraps at 3.15; blink frame shown when >= 3
  groundDashPeriod: 80, // ground dash spacing / distance % 80
  confettiCount: 22, // confetti particles spawned per chip
  pickupSpawnEvery: 10, // a coin pickup every 10th spawnCount
  chipSpawnEvery: 12, // a chip every 12th spawnCount
  popupLifetime: 0.75, // popup removed after age >= 0.75
  shareCopiedTimeoutMs: 2000, // share-button "copied" reset timeout
  scoreboardScreen: "#1313ba", // R.screen
  scoreboardInk: "#ffffff", // R.ink / R.bright
  scoreboardGroundDash: "#a2a2e8", // R.groundDash
  font: "12px 'Press Start 2P', monospace", // canvas font (source k)
  canvasDesktop: { w: 900, h: 320 }, // L
  canvasMobile: { w: 450, h: 320 }, // O
  mobileMediaQuery: "(max-width: 799px)", // N
  // chip-burst confetti palette
  confettiColors: ["#6a6ada", "#6262cb", "#abb5dc", "#cbcbf2", "#ffffff", "#b9d7ff", "#333385"],
};
