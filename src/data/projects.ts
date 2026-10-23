import type { Shot } from "@/lib/scenes";
import wtcBamboo from "@/assets/wtc-bamboo.png.asset.json";
import wtcCards from "@/assets/wtc-cards.png.asset.json";
import wtcCombat from "@/assets/wtc-combat.png.asset.json";
import wtcGrove from "@/assets/wtc-grove.png.asset.json";
import wtcLogo from "@/assets/wtc-logo.png.asset.json";
import wtcSlashing from "@/assets/wtc-slashing.png.asset.json";
import wtcPoster from "@/assets/wtc-trailer-poster.jpg.asset.json";
import wtcTrailer from "@/assets/wtc-trailer.mp4.asset.json";
import gullyCharacters from "@/assets/gully-characters.webp.asset.json";
import gullyCover from "@/assets/gully-cover.webp.asset.json";
import gullyGrounds from "@/assets/gully-grounds.webp.asset.json";
import gullyModes from "@/assets/gully-modes.webp.asset.json";
import gullyPoster from "@/assets/gully-trailer-poster.jpg.asset.json";
import gullyTrailer from "@/assets/gully-trailer.mp4.asset.json";
import russKeyart from "@/assets/russ-keyart.png.asset.json";
import russDrones from "@/assets/russ-drones.png.asset.json";
import russLab from "@/assets/russ-lab.png.asset.json";
import russLevelup from "@/assets/russ-levelup.png.asset.json";
import signedCover from "@/assets/signed-cover.png.asset.json";
import signedSignature from "@/assets/signed-signature.png.asset.json";
import signedBoss from "@/assets/signed-boss.png.asset.json";
import signedDesk from "@/assets/signed-desk.png.asset.json";
import signedTrailer from "@/assets/signed-trailer.mp4.asset.json";
import signedPoster from "@/assets/signed-trailer-poster.jpg.asset.json";
import mallocGame from "@/assets/malloc-game.png.asset.json";
import mallocCorridor from "@/assets/malloc-editor-corridor.png.asset.json";
import mallocRoom from "@/assets/malloc-editor-room.png.asset.json";
import boogieCatalog from "@/assets/boogie-catalog.png.asset.json";
import boogiePromo from "@/assets/boogie-promo.webp.asset.json";


/* ===== Projects: edit text here. Each "shots" entry is one screenshot slot. =====
   Scene presets: "dusk" (seed, sun 0-1), "ember" (seed, fx 0-1), "gray" (seed, z 0-2).
   A trailer: { p: "video", src: <video url>, poster: <cover image url> } – it gets a play button in the row.
   role / team / tools / year are optional – leave them out to hide them. */
export interface Project {
  id: string;
  title: string;
  year?: string;
  engine: string;
  tagline: string;
  text: string;
  role?: string;
  team?: string;
  tools?: string;
  duration?: string;
  /** Add your confirmed contributions here to show the new layout's What I did section. */
  did?: { area: string; title: string; goal: string; built: string; result: string; shot: number; caption: string }[];
  link: string;
  linkLabel: string;
  shots: Shot[];
}

export const PROJECTS: Project[] = [
  {
    id: "wtc",
    title: "WTC, What The Creature!",
    engine: "Unity",
    tagline: "A 2.5D roguelike survivor with 25+ unique ability cards.",
    text: "Dynamic roguelike gameplay built around diverse card combinations and strategic depth. Every run plays differently depending on the abilities you stack.",
    role: "Game developer",
    tools: "Unity, C#",
    link: "https://play.google.com/store/apps/details?id=com.abhitechgames.whatthecreature.survivor.cartoony&pcampaignid=web_share",
    linkLabel: "Get it on Google Play",
    // MOCK "What I did" content – replace each goal/built/result with real details.
    did: [
      { area: "Gameplay", title: "25+ ability cards", goal: "Give every run a different build so the roguelike loop stays fresh.", built: "Designed and implemented the ability card system in C#: card data, stacked effects, cooldowns and synergies.", result: "Runs feel unique, and card combinations are the core hook of the game.", shot: 6, caption: "The ability card system in action." },
      { area: "Combat", title: "Enemy encounters", goal: "Fast, readable combat that scales as the run gets harder.", built: "Built enemy behaviours, hit detection and balance tuning across the forest, swamp and bamboo levels.", result: "Combat stays clear and challenging right through the late run.", shot: 2, caption: "Forest combat." },
    ],
    shots: [{ p: "img", src: wtcLogo.url }, { p: "video", src: wtcTrailer.url, poster: wtcPoster.url }, { p: "img", src: wtcCombat.url }, { p: "img", src: wtcGrove.url }, { p: "img", src: wtcBamboo.url }, { p: "img", src: wtcSlashing.url }, { p: "img", src: wtcCards.url }],
  },
  {
    id: "gully-gangs",
    title: "Gully Gangs: Street Cricket",
    engine: "Unity",
    tagline: "The ultimate 4v4 multiplayer cricket game on mobile.",
    text: "Gully Gangs is packed with raw gully vibes, exciting gameplay and non-stop action – all on your mobile.",
    role: "Game developer",
    tools: "Unity, C#, Multiplayer",
    link: "https://play.google.com/store/apps/details?id=com.BIG.ClanCricket&hl=en_IN",
    linkLabel: "Get it on Google Play",
    did: [
      { area: "Multiplayer", title: "4v4 online matches", goal: "Smooth real-time matches even on mobile networks.", built: "Worked on the multiplayer flow — matchmaking, state sync and lag handling for 4v4 games.", result: "Four players can play a full gully cricket match over mobile data.", shot: 2, caption: "Multiplayer modes." },
      { area: "Game feel", title: "Gully cricket rules", goal: "Recreate street-cricket rules and vibes instead of a formal stadium game.", built: "Implemented gully rules, character selection and the City / Village / Chennai grounds.", result: "Matches feel like a street game, not a stadium simulation.", shot: 4, caption: "Ground selection." },
    ],
    shots: [{ p: "img", src: gullyCover.url, fit: "contain" }, { p: "video", src: gullyTrailer.url, poster: gullyPoster.url }, { p: "img", src: gullyModes.url }, { p: "img", src: gullyCharacters.url }, { p: "img", src: gullyGrounds.url }],
  },
  {
    id: "boogie-games",
    title: "Boogie Games",
    engine: "Mobile",
    tagline: "Play mini games and unlock real rewards.",
    text: "Play fun casual mini games, earn Boogie Coins, and unlock discount coupons and vouchers from top shopping and food brands – all from one app.",
    role: "Game developer",
    tools: "Unity, C#",
    link: "https://play.google.com/store/apps/details?id=com.FifthOceanStuido.GamesHubTest&pcampaignid=web_share",
    linkLabel: "Get it on Google Play",
    did: [
      { area: "Mini games", title: "Casual mini-game roster", goal: "Ship a growing catalog of quick games players return to daily.", built: "Built and polished mini-game loops in Unity and integrated the Boogie Coins reward flow.", result: "50+ mini games shipped, with new games added every week.", shot: 0, caption: "The mini-games catalog." },
      { area: "Rewards", title: "Coins and vouchers", goal: "Turn playtime into real-world rewards without hurting the game feel.", built: "Wired gameplay to the reward system: coins, coupons and brand vouchers.", result: "Players redeem discount vouchers from shopping and food brands.", shot: 1, caption: "Play games, stack coins." },
    ],
    shots: [{ p: "img", src: boogieCatalog.url }, { p: "img", src: boogiePromo.url, fit: "contain" }],
  },
  {
    id: "signed-away",
    title: "Signed Away",
    engine: "Unity",
    tagline: "A chaotic desk game.",
    text: "Sign fast, bin the traps, and survive four nightmare coworkers. A 2D simulation built in Unity.",
    role: "Game developer",
    tools: "Unity, C#",
    link: "https://ninaddixit.itch.io/signedaway",
    linkLabel: "Play on itch.io",
    did: [
      { area: "Gameplay", title: "Desk chaos loop", goal: "Make the core loop — sign, bin, dodge — readable and frantic.", built: "Programmed the signing mechanic, trap papers and encounter logic in C#.", result: "A fast loop that stays fun under pressure through every encounter.", shot: 2, caption: "Signing papers." },
      { area: "Bosses", title: "Nightmare coworkers", goal: "Give every coworker a distinct threat pattern.", built: "Designed and scripted each boss's behaviour and paper gimmicks.", result: "Four distinct encounters that escalate the chaos.", shot: 3, caption: "A boss encounter." },
    ],
    shots: [{ p: "img", src: signedCover.url }, { p: "video", src: signedTrailer.url, poster: signedPoster.url }, { p: "img", src: signedSignature.url }, { p: "img", src: signedBoss.url }, { p: "img", src: signedDesk.url }],
  },
  {
    id: "russ",
    title: "Russ, Fight the Power",
    engine: "Unity",
    tagline: "A college project currently in development.",
    text: "An ambitious title exploring innovative gameplay mechanics and narrative design.",
    role: "Game developer",
    tools: "Unity, C#",
    link: "https://srijith-gopalakrishnan.itch.io/russ-fight-the-power",
    linkLabel: "View on itch.io",
    did: [
      { area: "Mechanics", title: "Core abilities", goal: "Nail the feel of the core abilities before the content builds out.", built: "Prototyped the player controller and ability set — the battery, magnet and movement cards shown on the reward screen.", result: "A playable loop the team builds levels around.", shot: 3, caption: "Reward cards." },
      { area: "Enemies", title: "Drone encounters", goal: "Keep threats readable in a busy top-down scene.", built: "Built drone behaviour, telegraphs and hit reactions.", result: "Threats read clearly during combat.", shot: 1, caption: "Drone combat." },
    ],
    shots: [{ p: "img", src: russKeyart.url, fit: "contain" }, { p: "img", src: russDrones.url }, { p: "img", src: russLab.url }, { p: "img", src: russLevelup.url }],
  },
  {
    id: "malloc",
    title: "Malloc",
    engine: "Unreal Engine",
    tagline: "A fast-paced prototype built during a game jam.",
    text: "Showcases rapid prototyping and creative problem-solving under tight time constraints.",
    role: "Game developer",
    team: "Game jam",
    tools: "Unreal Engine",
    link: "https://ninaddixit.itch.io/malloc",
    linkLabel: "Play on itch.io",
    did: [
      { area: "Prototype", title: "Game-jam build", goal: "Ship a playable prototype inside the jam deadline.", built: "Built the core loop — corridors, targets and triggers — in Unreal Engine over the jam weekend.", result: "A complete playable build in 48 hours.", shot: 0, caption: "In-game." },
      { area: "Level editor", title: "Editor tooling", goal: "Let the team build rooms fast without code.", built: "Built a simple level-editor setup with cages, blocks and arrow triggers.", result: "Rooms could be iterated in minutes.", shot: 1, caption: "Corridor targets." },
    ],
    shots: [{ p: "img", src: mallocGame.url }, { p: "img", src: mallocCorridor.url }, { p: "img", src: mallocRoom.url }],
  },
];

/* Awards the user stated. Keep the exact wording of the ceremony, category and result. */
export interface Award {
  ceremony: string;
  category: string;
  result: string;
  game: string;
  won: boolean;
}

export const AWARDS: Award[] = [
  { ceremony: "Gem Awards", category: "Best Student Game", result: "Winner", game: "What The Creature!", won: true },
  { ceremony: "FICCI BAF Awards", category: "", result: "Runner-up", game: "What The Creature!", won: false },
];
