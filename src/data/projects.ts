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
    shots: [{ p: "gray", seed: 3, z: 0 }, { p: "gray", seed: 19, z: 1 }, { p: "gray", seed: 42, z: 2 }],
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
    shots: [{ p: "dusk", seed: 88, sun: 0.4 }, { p: "dusk", seed: 14, sun: 0.75 }, { p: "dusk", seed: 99, sun: 0.2 }],
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
    shots: [{ p: "ember", seed: 5, fx: 0.4 }, { p: "ember", seed: 29, fx: 0.65 }, { p: "ember", seed: 73, fx: 0.25 }],
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
    shots: [{ p: "img", src: russKeyart.url, fit: "contain" }, { p: "img", src: russDrones.url }, { p: "img", src: russLab.url }, { p: "img", src: russLevelup.url }],
  },
  {
    id: "documents",
    title: "Documents",
    engine: "Game design",
    tagline: "Design documents, technical docs and research.",
    text: "A collection of game design documents, technical documentation and research papers developed throughout my studies.",
    link: "https://drive.google.com/drive/folders/1LkdhEufyAnk8N17kA8eFRrpcrcCi9b6j",
    linkLabel: "View documents",
    shots: [{ p: "gray", seed: 12, z: 2 }, { p: "gray", seed: 31, z: 1 }, { p: "gray", seed: 47, z: 0 }],
  },
];
