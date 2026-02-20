import { For, type JSX } from "solid-js"
import { Button } from "@danielfrg/ui/button"
import * as Avatar from "@danielfrg/ui/avatar"
import * as Checkbox from "@danielfrg/ui/checkbox"
import * as Switch from "@danielfrg/ui/switch"
import { Separator } from "@danielfrg/ui/separator"
import {
  Search as MagnifyingGlassIcon,
  Heart as HeartIconLucide,
  History as CounterClockwiseClockIcon,
  SlidersHorizontal as MixerHorizontalIcon,
  Play as PlayIconLucide,
  Volume as VolumeNoneIconLucide,
  Volume2 as VolumeMaxIconLucide,
  Check as CheckIconLucide,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
  SkipBack as SkipBackIcon,
  SkipForward as SkipForwardIcon,
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  BarChart3 as NormalizeIcon,
  SlidersVertical as EqualizerIcon,
  Box as Audio3DIcon,
  AudioLines as CrossFadeIcon,
} from "lucide-solid"
import { allPeople } from "./people"
import styles from "./music.module.css"

// ── Icon wrappers ──────────────────────────────────────────────
function HeartIcon(props: { opacity?: number }) {
  return <HeartIconLucide size={20} style={{ opacity: String(props.opacity ?? 1) }} />
}

function PlayIcon(props: { size?: number }) {
  return <PlayIconLucide size={props.size ?? 20} />
}

function VolumeNoneIcon(props: { opacity?: number }) {
  return <VolumeNoneIconLucide size={20} style={{ opacity: String(props.opacity ?? 0.7) }} />
}

function VolumeMaxIcon(props: { opacity?: number }) {
  return <VolumeMaxIconLucide size={20} style={{ opacity: String(props.opacity ?? 0.7) }} />
}

function CheckIcon() {
  return <CheckIconLucide size={10} stroke-width={3} />
}

// ── Song data ──────────────────────────────────────────────────
const songsQueue = [
  {
    name: "The Less I Know the Better",
    artist: "Tame Impala",
    album: "Currents",
    length: "3:39",
    cover: "https://workos.imgix.net/images/79645741-51e0-47fc-bb40-2fa66cf9f68e.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(339, 80%, 60%)",
  },
  {
    name: "Pieces",
    artist: "Villagers",
    album: "Becoming a Jackal",
    length: "5:25",
    cover: "https://workos.imgix.net/images/95ff9b99-36f3-46d8-a3fe-9387fd7c3c32.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(356, 80%, 31%)",
  },
  {
    name: "Cola",
    artist: "Arlo Parks",
    album: "Super Sad Generation",
    length: "3:50",
    cover: "https://workos.imgix.net/images/945c66a9-afd9-4b1c-8eb0-4ce3992731ca.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(315, 90%, 70%, 0.2)",
  },
  {
    name: "Do the Astral Plane",
    artist: "Flying Lotus",
    album: "Cosmogramma",
    length: "3:58",
    cover: "https://workos.imgix.net/images/3d9075e4-c232-4fb5-a1a4-b0a33d669192.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(80, 9%, 66%)",
  },
  {
    name: "Left Hand Free",
    artist: "Alt-J",
    album: "This Is All Yours",
    length: "2:54",
    cover: "https://workos.imgix.net/images/8d431b64-ebe8-41be-b986-2f59cb5c567d.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(330, 70%, 64%)",
  },
]

const songsHistory = [
  {
    name: "Sunday Rain",
    artist: "Foo Fighters",
    album: "Concrete and Gold",
    length: "6:11",
    cover: "https://workos.imgix.net/images/28bf3f7c-4ad7-4bd9-9064-c63d2676c8dd.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(40, 30%, 55%)",
  },
  {
    name: "Left Hand Free",
    artist: "Alt-J",
    album: "This Is All Yours",
    length: "2:54",
    cover: "https://workos.imgix.net/images/8d431b64-ebe8-41be-b986-2f59cb5c567d.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(330, 70%, 64%)",
  },
  {
    name: "Last",
    artist: "Nine Inch Nails",
    album: "Broken",
    length: "4:45",
    cover: "https://workos.imgix.net/images/5f495e55-4bac-4573-b97f-bac55d4f3a82.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(30, 100%, 50%)",
  },
  {
    name: "13LACK 13ALLOONZ (feat. Twelve'len & GoldLink)",
    artist: "Denzel Curry",
    album: "TA13OO",
    length: "3:31",
    cover: "https://workos.imgix.net/images/f1b1ff42-eae9-4fcd-9c7f-c3ed92594395.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(0, 0%, 25%)",
  },
  {
    name: "Self Control",
    artist: "Frank Ocean",
    album: "Blond",
    length: "4:10",
    cover: "https://workos.imgix.net/images/419f09bc-99ab-4eae-8e71-d33f0577bd47.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(80, 20%, 40%)",
  },
  {
    name: "Trippy (feat. J. Cole)",
    artist: "Anderson .Paak",
    album: "Oxnard",
    length: "5:24",
    cover: "https://workos.imgix.net/images/daab7042-222f-433f-abcb-15811b8a43da.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(193, 15%, 45%)",
  },
  {
    name: "Nightclubbing",
    artist: "Iggy Pop",
    album: "The Idiot",
    length: "4:16",
    cover: "https://workos.imgix.net/images/85451af7-27bf-4bbb-88e7-088caf762ed5.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(34, 7%, 45%)",
  },
  {
    name: "Heaven Beside You",
    artist: "Alice in Chains",
    album: "Alice in Chains",
    length: "5:28",
    cover: "https://workos.imgix.net/images/72edfcaf-2e5b-492c-bb5b-60a031f001c9.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(289, 3%, 51%)",
  },
  {
    name: "Night After Night",
    artist: "Laura Marling",
    album: "A Creature I Don't Know",
    length: "5:08",
    cover: "https://workos.imgix.net/images/0cce32ae-6890-419e-b01c-2e89d36cb883.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(40, 13%, 83%)",
  },
  {
    name: "HEAVN",
    artist: "Jamila Woods",
    album: "HEAVN",
    length: "4:23",
    cover: "https://workos.imgix.net/images/e865c892-5cbe-4d1f-b4eb-e2bc301087f0.png?auto=format&fit=clip&q=80&w=192",
    color: "hsl(32, 95%, 67%)",
  },
]

const albumsFavorites = [
  {
    name: "Blond",
    artist: "Frank Ocean",
    cover: "https://workos.imgix.net/images/419f09bc-99ab-4eae-8e71-d33f0577bd47.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(0, 0%, 50%, 0.2)",
  },
  {
    name: "Konoyo",
    artist: "Tim Hecker",
    cover: "https://workos.imgix.net/images/d2e1f2a4-5994-4f38-b3f4-0c78c946b616.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(210, 30%, 40%)",
  },
  {
    name: "Los Angeles",
    artist: "Flying Lotus",
    cover: "https://workos.imgix.net/images/29a1153b-e12a-45d8-95a7-812657566204.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(200, 30%, 20%, 0.2)",
  },
  {
    name: "The Fragile",
    artist: "Nine Inch Nails",
    cover: "https://workos.imgix.net/images/c33df9ee-0126-450b-ac7c-df1b76fc12da.png?auto=format&fit=clip&q=80",
    color: "hsl(15, 80%, 50%)",
  },
  {
    name: "Sketches of Spain",
    artist: "Miles Davis",
    cover: "https://workos.imgix.net/images/bc4dcddb-c350-413b-bc1f-38126cf9f68e.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(35, 100%, 50%)",
  },
]

const playlistsForYou = [
  {
    title: "Rebellious '90s and '00s",
    caption: "Throwback to the teenage years",
    cover: "https://workos.imgix.net/images/ea236dea-fd26-4972-9430-d2677457bd0a.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(36, 70%, 50%)",
  },
  {
    title: "Soft Rock",
    caption: "Songs you can't go wrong with",
    cover: "https://workos.imgix.net/images/9488cafc-5341-4164-a292-e34bf21dfbd5.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(235, 50%, 40%, 0.4)",
  },
  {
    title: "Trip-Hop Essentials",
    caption: "Dark and moody grooves",
    cover: "https://workos.imgix.net/images/dae75b0e-081b-43db-9984-b920de71e028.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(230, 100%, 50%, 0.3)",
  },
  {
    title: "Vintage Jazz",
    caption: "Travel through the times",
    cover: "https://workos.imgix.net/images/543ebff8-5f5c-4278-abb3-e1f17b723c30.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(260, 100%, 50%, 0.3)",
  },
  {
    title: "Funk Up",
    caption: "Irresistible beats",
    cover: "https://workos.imgix.net/images/01d61c66-7b4c-482d-b439-aa05f8845a55.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(260, 100%, 50%, 0.3)",
  },
]

const albumsFriendsListen = [
  {
    name: "Vulgar Display of Power",
    artist: "Pantera",
    cover: "https://workos.imgix.net/images/52719781-7582-49b3-9cd5-090acbab44ad.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(5, 20%, 70%)",
  },
  {
    name: "ONUKA",
    artist: "ONUKA",
    cover: "https://workos.imgix.net/images/21f983e3-2ed2-411c-b442-ddff52e4b5fd.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(0, 0%, 50%, 0.2)",
  },
  {
    name: "Consolation",
    artist: "Protomartyr",
    cover: "https://workos.imgix.net/images/ce6430c1-6375-4de5-b1ce-40d69872f622.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(50, 90%, 50%)",
  },
  {
    name: "uknowhatimsayin\u00BF",
    artist: "Danny Brown",
    cover: "https://workos.imgix.net/images/3ea72e36-fcc5-4cc4-a378-444f48a5be5d.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(164, 85%, 50%)",
  },
  {
    name: "Floating Points",
    artist: "Crush",
    cover: "https://workos.imgix.net/images/1dfabeef-80f4-47b8-a8c4-7bec6c4b8b0d.png?auto=format&fit=clip&q=80&w=500",
    color: "hsl(210, 40%, 50%)",
  },
]

// ── Album card sub-component ───────────────────────────────────
function AlbumCard(props: { title: string; caption: string; cover: string; color: string }) {
  return (
    <div class={styles.albumCard}>
      <div class={styles.mb2}>
        <img
          class={styles.albumCover}
          src={props.cover}
          style={{
            "box-shadow": `0 8px 48px -16px ${props.color}`,
          }}
        />
        <div class={styles.albumPlay}>
          <button class={styles.iconBtnPlay}>
            <PlayIcon size={16} />
          </button>
        </div>
      </div>
      <div class={`${styles.textSm} ${styles.textTruncate}`}>{props.title}</div>
      <div class={`${styles.textXs} ${styles.textMuted} ${styles.textTruncate}`}>{props.caption}</div>
    </div>
  )
}

// ── Song row sub-component ─────────────────────────────────────
function SongRow(props: { song: (typeof songsQueue)[0] }) {
  return (
    <div class={styles.songRow}>
      <img class={styles.songCover} src={props.song.cover} />
      <div class={styles.songInfo}>
        <div class={`${styles.textSm} ${styles.textTruncate}`}>{props.song.name}</div>
        <div class={`${styles.textXs} ${styles.textMuted} ${styles.textTruncate}`}>
          {props.song.artist} – {props.song.album}
        </div>
      </div>
      <span class={`${styles.textSm} ${styles.textMuted}`}>{props.song.length}</span>
    </div>
  )
}

// ── Main Music App Component ───────────────────────────────────
export function ExampleMusic() {
  return (
    <div class={styles.layout}>
      {/* ── Left Sidebar ──────────────────────────────────── */}
      <div class={`${styles.col} ${styles.colSidebar}`}>
        {/* Queue */}
        <div class={styles.card}>
          <div class={`${styles.flexBetween} ${styles.mb5}`}>
            <h3 class={styles.h3}>Queue</h3>
            <div class={`${styles.flex} ${styles.gap4} ${styles.my1}`}>
              <Button class={`${styles.btn} ${styles.btnGhost}`}>Clear</Button>
              <Button class={`${styles.btn} ${styles.btnGhost}`}>Repeat</Button>
            </div>
          </div>
          <div class={`${styles.flexCol} ${styles.gap4}`}>
            <For each={songsQueue}>{(song) => <SongRow song={song} />}</For>
          </div>
        </div>

        {/* Sound */}
        <div class={styles.card}>
          <div class={`${styles.flexBetween} ${styles.mb5}`}>
            <h3 class={styles.h3}>Sound</h3>
            <span class={`${styles.textSm} ${styles.textMuted}`}>Yamaha THR</span>
          </div>
          <div
            class={`${styles.flexCenter} ${styles.gap2} ${styles.mb5}`}
            style={{ height: "16px", "margin-top": "8px" }}
          >
            <VolumeNoneIcon />
            <input type="range" class={`${styles.slider} ${styles.flexGrow}`} value="80" />
            <VolumeMaxIcon />
          </div>
          <div class={`${styles.grid4}`} style={{ "padding-top": "8px", "padding-bottom": "4px" }}>
            <div class={styles.soundFeature}>
              <button class={styles.iconBtnSolid}>
                <NormalizeIcon size={16} />
              </button>
              <div class={styles.flexCol}>
                <span class={`${styles.textSm} ${styles.textMedium} ${styles.textCenter}`}>Normalize</span>
                <span class={`${styles.textXs} ${styles.textMuted} ${styles.textCenter}`}>On</span>
              </div>
            </div>
            <div class={styles.soundFeature}>
              <button class={styles.iconBtnSolid}>
                <EqualizerIcon size={16} />
              </button>
              <div class={styles.flexCol}>
                <span class={`${styles.textSm} ${styles.textMedium} ${styles.textCenter}`}>Equalizer</span>
                <span class={`${styles.textXs} ${styles.textMuted} ${styles.textCenter}`}>On</span>
              </div>
            </div>
            <div class={styles.soundFeature}>
              <button class={styles.iconBtnSoftGray}>
                <Audio3DIcon size={16} />
              </button>
              <div class={styles.flexCol}>
                <span class={`${styles.textSm} ${styles.textMedium} ${styles.textCenter}`}>3D Audio</span>
                <span class={`${styles.textXs} ${styles.textMuted} ${styles.textCenter}`}>Off</span>
              </div>
            </div>
            <div class={styles.soundFeature}>
              <button class={styles.iconBtnSoftGray}>
                <CrossFadeIcon size={16} />
              </button>
              <div class={styles.flexCol}>
                <span class={`${styles.textSm} ${styles.textMedium} ${styles.textCenter}`}>Cross-Fade</span>
                <span class={`${styles.textXs} ${styles.textMuted} ${styles.textCenter}`}>Off</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equalizer */}
        <div class={styles.card}>
          <div class={`${styles.flexBetween} ${styles.mb6}`}>
            <label class={`${styles.h3} ${styles.flexCenter} ${styles.gap2}`}>
              Equalizer
              <Switch.Root defaultChecked>
                <Switch.Input />
                <Switch.Control class={styles.switchControl}>
                  <Switch.Thumb class={styles.switchThumb} />
                </Switch.Control>
              </Switch.Root>
            </label>
            <Button class={`${styles.btn} ${styles.btnGhost}`}>Reset</Button>
          </div>
          <div style={{ position: "relative" }}>
            <div class={styles.eqDots}>
              <div class={styles.eqDotLine} />
              <div class={styles.eqDotLine} />
              <div class={styles.eqDotLine} />
              <div class={styles.eqSolidLine} />
              <div class={styles.eqDotLine} />
              <div class={styles.eqDotLine} />
              <div class={styles.eqDotLine} />
            </div>
            <div class={styles.eqGrid}>
              {[
                { f: "32", v: 75 },
                { f: "64", v: 73 },
                { f: "125", v: 70 },
                { f: "250", v: 65 },
                { f: "500", v: 52 },
                { f: "1K", v: 50 },
                { f: "2K", v: 56 },
                { f: "3K", v: 57 },
                { f: "4K", v: 60 },
                { f: "6K", v: 62 },
                { f: "8K", v: 65 },
                { f: "16K", v: 68 },
              ].map((s) => (
                <div class={styles.eqSlider}>
                  <input
                    type="range"
                    class={`${styles.slider} ${styles.sliderSm} ${styles.sliderGray} ${styles.sliderVertical}`}
                    value={s.v}
                    min="0"
                    max="100"
                    style={{ height: "130px" }}
                  />
                  <span class={styles.textXs}>{s.f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History */}
        <div class={styles.card}>
          <div class={`${styles.flexBetween} ${styles.mb5}`}>
            <h3 class={styles.h3}>History</h3>
            <Button class={`${styles.btn} ${styles.btnGhost}`}>Clear</Button>
          </div>
          <div class={`${styles.flexCol} ${styles.gap4}`}>
            <For each={songsHistory}>{(song) => <SongRow song={song} />}</For>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────── */}
      <div class={`${styles.col} ${styles.colMain}`}>
        {/* Browse View */}
        <div class={`${styles.card} ${styles.cardLg}`} style={{ height: "896px" }}>
          {/* Window chrome */}
          <div class={styles.windowDots}>
            <div class={`${styles.dot} ${styles.dotRed}`} />
            <div class={`${styles.dot} ${styles.dotYellow}`} />
            <div class={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          {/* Search bar */}
          <div class={styles.searchBar}>
            <div class={styles.inputWithIcon} style={{ width: "400px" }}>
              <span class={styles.inputIcon}>
                <MagnifyingGlassIcon size={15} />
              </span>
              <input class={styles.inputField} placeholder="Search" />
            </div>
          </div>
          {/* Toolbar */}
          <div class={styles.toolbar}>
            <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
              <HeartIcon />
            </button>
            <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
              <CounterClockwiseClockIcon size={20} />
            </button>
            <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
              <MixerHorizontalIcon size={20} />
            </button>
            <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
              <Avatar.Root class={styles.avatarRoot}>
                <Avatar.Image class={styles.avatarImage} src={allPeople[23]?.image} alt={allPeople[23]?.name} />
                <Avatar.Fallback class={styles.avatarFallback}>{allPeople[23]?.name[0]}</Avatar.Fallback>
              </Avatar.Root>
            </button>
          </div>

          <div style={{ height: "40px" }} />

          {/* Your Favorites */}
          <div class={`${styles.flexBetween} ${styles.mb4}`}>
            <h2 class={styles.h2}>Your favorites</h2>
            <a
              class={`${styles.link} ${styles.textSm} ${styles.textMedium}`}
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Show all
            </a>
          </div>
          <div class={`${styles.grid5} ${styles.gap5} ${styles.mb7}`}>
            <For each={albumsFavorites}>
              {(a) => <AlbumCard title={a.name} caption={a.artist} cover={a.cover} color={a.color} />}
            </For>
          </div>

          {/* Made for You */}
          <div class={`${styles.flexBetween} ${styles.mb4}`}>
            <h2 class={styles.h2}>Made for you</h2>
            <a
              class={`${styles.link} ${styles.textSm} ${styles.textMedium}`}
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Show all
            </a>
          </div>
          <div class={`${styles.grid5} ${styles.gap5} ${styles.mb7}`}>
            <For each={playlistsForYou}>
              {(p) => <AlbumCard title={p.title} caption={p.caption} cover={p.cover} color={p.color} />}
            </For>
          </div>

          {/* Your Friends Listen */}
          <div class={`${styles.flexBetween} ${styles.mb4}`}>
            <h2 class={styles.h2}>Your friends listen</h2>
            <a
              class={`${styles.link} ${styles.textSm} ${styles.textMedium}`}
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Show all
            </a>
          </div>
          <div class={`${styles.grid5} ${styles.gap5}`}>
            <For each={albumsFriendsListen}>
              {(a) => <AlbumCard title={a.name} caption={a.artist} cover={a.cover} color={a.color} />}
            </For>
          </div>

          {/* Now Playing Bar */}
          <div class={styles.nowPlaying}>
            <div class={styles.nowPlayingBg} />
            <div class={styles.nowPlayingContent}>
              <div class={`${styles.flexCenter} ${styles.gap4}`} style={{ padding: "12px" }}>
                <button class={`${styles.iconBtnSolid}`} style={{ width: "40px", height: "40px" }}>
                  <PlayIcon size={20} />
                </button>
                <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
                  <ShuffleIcon size={20} style={{ opacity: "0.7" }} />
                </button>
                <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
                  <RepeatIcon size={20} style={{ opacity: "0.7" }} />
                </button>
              </div>
              <div class={`${styles.flexCenter} ${styles.gap3}`}>
                <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
                  <SkipBackIcon size={20} style={{ opacity: "0.7" }} />
                </button>
                <div class={`${styles.flexCenter} ${styles.gap3}`}>
                  <img src={songsHistory[6]?.cover} width="48" height="48" style={{ "border-radius": "4px" }} />
                  <div>
                    <div class={`${styles.textXs} ${styles.textMedium}`}>{songsHistory[6]?.name}</div>
                    <div class={`${styles.textXs} ${styles.textMuted} ${styles.mb2}`}>
                      {songsHistory[6]?.artist} – {songsHistory[6]?.album}
                    </div>
                    <div class={styles.progressBar}>
                      <div class={styles.progressFill} />
                      <div class={styles.progressTime}>
                        <span class={`${styles.textXs} ${styles.textMuted}`}>0:58 / {songsHistory[6]?.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
                  <SkipForwardIcon size={20} style={{ opacity: "0.7" }} />
                </button>
              </div>
              <div class={`${styles.flexCenter} ${styles.gap2}`} style={{ padding: "20px" }}>
                <VolumeNoneIcon />
                <input
                  type="range"
                  class={`${styles.slider} ${styles.sliderSm} ${styles.sliderGray}`}
                  value="80"
                  style={{ width: "80px" }}
                />
                <VolumeMaxIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div class={styles.bottomRow}>
          {/* Settings */}
          <div class={`${styles.col} ${styles.colSub}`}>
            <div class={styles.card}>
              <h3 class={`${styles.h3} ${styles.mb5}`}>Settings</h3>
              <div class={`${styles.flexCol} ${styles.gap5}`}>
                {[
                  {
                    label: "Automatic downloads",
                    desc: "Automatically download music when added to your library",
                    on: false,
                  },
                  {
                    label: "Lossless audio",
                    desc: "Preserve every detail of the original audio, but consume significantly more data",
                    on: false,
                  },
                  { label: "Spatial audio", desc: "Enhancing the perception of audio in space", on: false },
                  { label: "Normalize volume", desc: "Set the same volume level for all tracks", on: true },
                ].map((s) => (
                  <label class={styles.settingsRow}>
                    <div class={styles.settingsInfo}>
                      <span class={`${styles.textSm} ${styles.textMedium} ${styles.mb1}`}>{s.label}</span>
                      <span class={`${styles.textXs} ${styles.textMuted}`}>{s.desc}</span>
                    </div>
                    <Switch.Root defaultChecked={s.on}>
                      <Switch.Input />
                      <Switch.Control
                        class={`${styles.switchControl} ${styles.switchLg}`}
                        style={{ "margin-top": "8px" }}
                      >
                        <Switch.Thumb class={`${styles.switchThumb} ${styles.switchThumbLg}`} />
                      </Switch.Control>
                    </Switch.Root>
                  </label>
                ))}
                <div>
                  <div class={styles.settingsRow}>
                    <div class={styles.settingsInfo}>
                      <span class={`${styles.textSm} ${styles.textMedium} ${styles.mb1}`}>Maximum volume</span>
                      <span class={`${styles.textXs} ${styles.textMuted}`}>
                        Limit the maximum volume to protect hearing
                      </span>
                    </div>
                  </div>
                  <div class={`${styles.flexCenter} ${styles.gap2} ${styles.mt2}`}>
                    <span class={`${styles.textXs} ${styles.textMuted}`} style={{ width: "24px" }}>
                      0%
                    </span>
                    <input type="range" class={`${styles.slider} ${styles.sliderSm} ${styles.flexGrow}`} value="80" />
                    <span class={`${styles.textXs} ${styles.textMuted}`} style={{ width: "32px" }}>
                      100%
                    </span>
                  </div>
                </div>
                <div>
                  <div class={styles.settingsRow}>
                    <div class={styles.settingsInfo}>
                      <span class={`${styles.textSm} ${styles.textMedium} ${styles.mb1}`}>Crossfade</span>
                      <span class={`${styles.textXs} ${styles.textMuted}`}>Smoothly fade out into the next song.</span>
                    </div>
                  </div>
                  <div class={`${styles.flexCenter} ${styles.gap2} ${styles.mt2}`}>
                    <span class={`${styles.textXs} ${styles.textMuted}`} style={{ width: "24px" }}>
                      Off
                    </span>
                    <input type="range" class={`${styles.slider} ${styles.sliderSm} ${styles.flexGrow}`} value="0" />
                    <span class={`${styles.textXs} ${styles.textMuted}`} style={{ width: "32px" }}>
                      10s
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership */}
            <div class={styles.card}>
              <div class={`${styles.flexBetween} ${styles.mb5}`}>
                <h3 class={styles.h3}>Membership</h3>
                <Button class={`${styles.btn} ${styles.btnGhost}`}>Done</Button>
              </div>
              <div class={`${styles.flexCol} ${styles.gap4}`}>
                {[
                  { name: "Individual", desc: "Sign up with 1 account", price: "$4.99", active: false },
                  { name: "Duo", desc: "Sign up 2 accounts", price: "$6.99", active: true },
                  { name: "Family", desc: "Sign up to 6 accounts", price: "$12.99", active: false },
                ].map((tier) => (
                  <div class={styles.memberRow}>
                    <div class={`${styles.flexCol} ${styles.gap1}`}>
                      <span class={`${styles.textSm} ${styles.textMedium}`}>{tier.name}</span>
                      <span class={`${styles.textXs} ${styles.textMuted}`}>{tier.desc}</span>
                    </div>
                    <Button
                      class={`${styles.btn} ${tier.active ? styles.btnPrimary : styles.btnSoft}`}
                      style={{ width: "64px" }}
                    >
                      {tier.price}
                    </Button>
                  </div>
                ))}
              </div>
              <Separator class={styles.separator} style={{ margin: "20px 0" }} />
              <p class={`${styles.textSm}`} style={{ margin: "12px 0" }}>
                Your next payment is $6.99 on{" "}
                {new Date(Date.now() + 20 * 86400000).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <a class={`${styles.link} ${styles.textSm}`} href="#" onClick={(e) => e.preventDefault()}>
                Cancel subscription
              </a>
            </div>
          </div>

          {/* Profile + Playlist */}
          <div class={`${styles.col} ${styles.colSub}`}>
            <div class={styles.card}>
              <div class={`${styles.flexBetween} ${styles.mb5}`}>
                <h3 class={styles.h3}>Your profile</h3>
                <div class={`${styles.flex} ${styles.gap4} ${styles.my1}`}>
                  <Button class={`${styles.btn} ${styles.btnGhost}`}>Cancel</Button>
                  <Button class={`${styles.btn} ${styles.btnGhost}`}>Save</Button>
                </div>
              </div>
              <div class={`${styles.flexCol} ${styles.gap4}`}>
                <label class={`${styles.flexCol} ${styles.gap1}`}>
                  <span class={`${styles.textSm} ${styles.textMedium}`}>Name</span>
                  <input class={`${styles.inputField} ${styles.inputClassic}`} value="Vlad Moroz" />
                </label>
                <label class={`${styles.flexCol} ${styles.gap1}`}>
                  <span class={`${styles.textSm} ${styles.textMedium}`}>Username</span>
                  <input class={`${styles.inputField} ${styles.inputClassic}`} value="@vladmoroz" />
                </label>
                <label class={`${styles.flexCol} ${styles.gap1}`}>
                  <span class={`${styles.textSm} ${styles.textMedium}`}>Email</span>
                  <input class={`${styles.inputField} ${styles.inputClassic}`} value="hi@vladmoroz.com" />
                </label>
                <div class={`${styles.flexCol} ${styles.gap2}`}>
                  <span class={`${styles.textSm} ${styles.textMedium}`}>Privacy</span>
                  {[
                    { label: "Display my listening history", checked: true },
                    { label: "Everyone can follow my activity", checked: false },
                    { label: "Show my playlists in search", checked: true },
                  ].map((item) => (
                    <Checkbox.Root defaultChecked={item.checked} class={`${styles.flexCenter} ${styles.gap2}`}>
                      <Checkbox.Input />
                      <Checkbox.Control class={styles.checkboxControl}>
                        <Checkbox.Indicator class={styles.checkboxIndicator}>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Control>
                      <span class={styles.textSm}>{item.label}</span>
                    </Checkbox.Root>
                  ))}
                </div>
                <div class={`${styles.flexCol} ${styles.gap2}`}>
                  <span class={`${styles.textSm} ${styles.textMedium}`}>Danger zone</span>
                  <a class={`${styles.link} ${styles.textSm}`} href="#" onClick={(e) => e.preventDefault()}>
                    Reset recommendations
                  </a>
                  <a class={`${styles.link} ${styles.textSm}`} href="#" onClick={(e) => e.preventDefault()}>
                    Delete profile
                  </a>
                </div>
              </div>
            </div>

            {/* Create a Playlist */}
            <div class={styles.card}>
              <div class={`${styles.flexBetween} ${styles.mb5}`}>
                <h3 class={styles.h3}>Create a playlist</h3>
                <div class={`${styles.flex} ${styles.gap4} ${styles.my1}`}>
                  <Button class={`${styles.btn} ${styles.btnGhost}`}>Start over</Button>
                  <Button class={`${styles.btn} ${styles.btnGhost}`}>Next</Button>
                </div>
              </div>
              <div class={`${styles.flex} ${styles.gap2} ${styles.flexWrap}`}>
                {[
                  "Pop",
                  "Rock",
                  "Hip-Hop",
                  "R&B",
                  "Country",
                  "Jazz",
                  "Blues",
                  "Electronic",
                  "Experimental",
                  "Reggae",
                  "Ska",
                  "Grunge",
                  "Psychedelic",
                  "Post-Rock",
                  "Progressive Rock",
                  "Dream Pop",
                  "Ambient",
                  "Classical",
                  "Trip-Hop",
                  "Gospel",
                  "Folk",
                  "Indie",
                  "Alternative",
                  "Punk",
                  "Metal",
                  "Funk",
                  "Soul",
                  "Dance",
                  "Techno",
                  "Acoustic",
                  "House",
                  "Dubstep",
                  "Latin",
                  "Salsa",
                  "K-pop",
                ].map((genre) => (
                  <Button
                    class={`${styles.btn} ${["Blues", "Jazz", "Funk"].includes(genre) ? styles.btnPillActive : `${styles.btnSoft} ${styles.btnPill}`}`}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Album Feature + Lyrics */}
          <div class={`${styles.col} ${styles.colSub}`}>
            {/* Album Feature */}
            <div class={styles.card}>
              <div class={`${styles.flex} ${styles.justifyCenter}`} style={{ margin: "16px", position: "relative" }}>
                <img
                  width="200"
                  height="200"
                  src="https://workos.imgix.net/images/e35b46dc-4384-43d1-932c-24fa44e212cd.png?auto=format&fit=clip&q=80"
                  style={{
                    "border-radius": "6px",
                    "box-shadow": "0 8px 80px -24px hsl(205, 100%, 50%)",
                  }}
                />
              </div>
              <div class={styles.mt5}>
                <div class={styles.stars}>
                  {[1, 2, 3, 4].map(() => (
                    <StarIcon size={20} fill="currentColor" stroke-width={0} />
                  ))}
                  <StarHalfIcon size={20} />
                </div>
                <h3 class={`${styles.h3} ${styles.textCenter} ${styles.mb2}`}>King Krule – The OOZ</h3>
                <p class={`${styles.textSm} ${styles.textMuted} ${styles.textCenter} ${styles.mb4}`}>
                  A dark and introspective album that showcases King Krule's distinctive blend of genres, while
                  delivering hauntingly raw and poetic lyrics.
                </p>
                <div class={`${styles.flex} ${styles.justifyCenter} ${styles.gap3}`}>
                  <Button class={`${styles.btn} ${styles.btnPrimary}`}>Listen Now</Button>
                  <button class={styles.iconBtnSoftAccent}>
                    <HeartIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Lyrics */}
            <div class={styles.card}>
              <div class={styles.lyricsWrap}>
                <h3 class={`${styles.h3} ${styles.mb3}`}>Lyrics</h3>
                <div class={`${styles.textSm} ${styles.textMuted} ${styles.mb5}`}>King Krule – Biscuit Town</div>
                <div class={`${styles.textSm} ${styles.flexCol} ${styles.gap4}`}>
                  <div class={`${styles.flexCol} ${styles.gap1} ${styles.alignStart}`}>
                    <span>I seem to sink lower, gazing in the rays of the solar</span>
                    <span>In fact, we made a pact, but now I think it's over</span>
                    <span>Red on white but he sipped on KA soda</span>
                    <span>Damn, that's Coca-Cola, as TV sports the Olympic ebola</span>
                    <span>I think we might be bipolar, I think she thinks I'm bipolar</span>
                    <span>He left the crime scene without the Motorola</span>
                    <span>Still had dreams of being Gianfranco Zola</span>
                    <span>For at least for now, it's all over</span>
                    <span>Yeah, at least for now, it's all over</span>
                  </div>
                  <div class={`${styles.flexCol} ${styles.gap1} ${styles.alignStart}`}>
                    <span>I seem to sink lower</span>
                    <span>In biscuit town, in biscuit town</span>
                  </div>
                  <div class={`${styles.flexCol} ${styles.gap1} ${styles.alignStart}`}>
                    <span>You're shallow waters, I'm the deep seabed</span>
                    <span>And I'm the reason you flow</span>
                    <span>I got more moons wrapped around my head</span>
                    <span>And Jupiter knows</span>
                  </div>
                </div>
                <div class={styles.lyricsFade} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
