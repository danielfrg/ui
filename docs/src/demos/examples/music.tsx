import { For, type JSX } from "solid-js"
import { Button } from "@danielfrg/ui/button"
import * as Avatar from "@danielfrg/ui/avatar"
import * as Checkbox from "@danielfrg/ui/checkbox"
import * as Switch from "@danielfrg/ui/switch"
import { Separator } from "@danielfrg/ui/separator"
import { allPeople } from "./people"
import styles from "./music.module.css"

// ── Icons ──────────────────────────────────────────────────────
function MagnifyingGlassIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM2 6.5C2 9.01472 4.01472 11 6.5 11C7.543 11 8.503 10.647 9.27 10.056L12.107 12.893C12.302 13.088 12.618 13.088 12.813 12.893C13.008 12.698 13.008 12.382 12.813 12.187L9.976 9.35C10.647 8.547 11 7.543 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5Z" />
    </svg>
  )
}

function HeartIcon(props: { opacity?: number }) {
  return (
    <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor" style={{ opacity: props.opacity ?? 1 }}>
      <path d="M 9.5449219 3 C 5.3895807 3 2 6.3895806 2 10.544922 C 2 14.283156 4.9005496 18.084723 7.6601562 21.119141 C 10.419763 24.153558 13.171875 26.369141 13.171875 26.369141 A 1.0001 1.0001 0 0 0 13.197266 26.388672 C 13.642797 26.725148 14.201794 26.943857 14.808594 26.984375 A 1.0001 1.0001 0 0 0 15 27 A 1.0001 1.0001 0 0 0 15.189453 26.984375 A 1.0001 1.0001 0 0 0 15.199219 26.982422 C 15.802918 26.940449 16.359155 26.723674 16.802734 26.388672 A 1.0001 1.0001 0 0 0 16.828125 26.369141 C 16.828125 26.369141 19.580237 24.153558 22.339844 21.119141 C 25.099451 18.084722 28 14.283156 28 10.544922 C 28 6.3895806 24.610419 3 20.455078 3 C 17.841043 3 15.989939 4.4385487 15 5.4570312 C 14.010061 4.4385487 12.158957 3 9.5449219 3 z M 9.5449219 5 C 12.276127 5 13.937826 7.2424468 14.103516 7.4746094 A 1.0001 1.0001 0 0 0 14.994141 8.0136719 A 1.0001 1.0001 0 0 0 15.017578 8.0136719 A 1.0001 1.0001 0 0 0 15.041016 8.0117188 A 1.0001 1.0001 0 0 0 15.117188 8.0058594 A 1.0001 1.0001 0 0 0 15.892578 7.4785156 C 16.049938 7.2575052 17.716133 5 20.455078 5 C 23.529737 5 26 7.4702629 26 10.544922 C 26 13.147688 23.499768 16.870104 20.859375 19.773438 C 18.227966 22.666891 15.607768 24.780451 15.589844 24.794922 C 15.414236 24.925626 15.219097 25 15 25 C 14.780903 25 14.585764 24.92563 14.410156 24.794922 C 14.392236 24.780452 11.772034 22.666891 9.140625 19.773438 C 6.5002316 16.870105 4 13.147688 4 10.544922 C 4 7.4702629 6.470263 5 9.5449219 5 z" />
    </svg>
  )
}

function CounterClockwiseClockIcon(props: { opacity?: number }) {
  return (
    <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor" style={{ opacity: props.opacity ?? 1 }}>
      <path d="M 15 3 C 8.3845336 3 3 8.3845336 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 10.860283 24.897915 7.2001531 21.699219 5.0429688 L 22.845703 3.5722656 L 18 3.3964844 L 19.398438 8 L 20.460938 6.6347656 C 22.927938 8.2475139 24.639833 10.910337 24.945312 14.003906 A 1 1 0 0 0 24.951172 16 C 24.483457 20.733488 20.731802 24.484346 15.998047 24.951172 A 1 1 0 0 0 15 24 A 1 1 0 0 0 14.001953 24.951172 C 9.267557 24.484283 5.515717 20.732443 5.0488281 15.998047 A 1 1 0 0 0 5.0488281 14 C 5.5490109 8.9379267 9.80344 5 15 5 A 1.0001 1.0001 0 1 0 15 3 z M 14.984375 7.9863281 A 1.0001 1.0001 0 0 0 14 9 L 14 14.5 L 10.400391 17.199219 A 1.0003905 1.0003905 0 1 0 11.599609 18.800781 L 15.599609 15.800781 A 1.0001 1.0001 0 0 0 16 15 L 16 9 A 1.0001 1.0001 0 0 0 14.984375 7.9863281 z" />
    </svg>
  )
}

function MixerHorizontalIcon(props: { opacity?: number }) {
  return (
    <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor" style={{ opacity: props.opacity ?? 1 }}>
      <path d="M 20 4 C 18.706841 4 17.604859 4.84267 17.1875 6 L 4 6 A 1.0001 1.0001 0 1 0 4 8 L 17.1875 8 C 17.604859 9.15733 18.706841 10 20 10 C 21.293159 10 22.395141 9.15733 22.8125 8 L 26 8 A 1.0001 1.0001 0 1 0 26 6 L 22.8125 6 C 22.395141 4.84267 21.293159 4 20 4 z M 20 6 C 20.54383 6 20.958426 6.4088115 20.988281 6.9433594 A 1.0001 1.0001 0 0 0 20.988281 7.0585938 C 20.957487 7.5921595 20.543157 8 20 8 C 19.45617 8 19.041574 7.5911885 19.011719 7.0566406 A 1.0001 1.0001 0 0 0 19.011719 6.9414062 C 19.042513 6.4078405 19.456843 6 20 6 z M 12 12 C 10.706841 12 9.6048586 12.84267 9.1875 14 L 4 14 A 1.0001 1.0001 0 1 0 4 16 L 9.1875 16 C 9.6048586 17.15733 10.706841 18 12 18 C 13.293159 18 14.395141 17.15733 14.8125 16 L 26 16 A 1.0001 1.0001 0 1 0 26 14 L 14.8125 14 C 14.395141 12.84267 13.293159 12 12 12 z M 12 14 C 12.54383 14 12.958426 14.408812 12.988281 14.943359 A 1.0001 1.0001 0 0 0 12.988281 15.058594 C 12.957487 15.592159 12.543157 16 12 16 C 11.45617 16 11.041574 15.591188 11.011719 15.056641 A 1.0001 1.0001 0 0 0 11.011719 14.941406 C 11.042513 14.407841 11.456843 14 12 14 z M 16 20 C 14.706841 20 13.604859 20.84267 13.1875 22 L 4 22 A 1.0001 1.0001 0 1 0 4 24 L 13.1875 24 C 13.604859 25.15733 14.706841 26 16 26 C 17.293159 26 18.395141 25.15733 18.8125 24 L 26 24 A 1.0001 1.0001 0 1 0 26 22 L 18.8125 22 C 18.395141 20.84267 17.293159 20 16 20 z M 16 22 C 16.54383 22 16.958426 22.408812 16.988281 22.943359 A 1.0001 1.0001 0 0 0 16.988281 23.058594 C 16.957487 23.592159 16.543157 24 16 24 C 15.45617 24 15.041574 23.591188 15.011719 23.056641 A 1.0001 1.0001 0 0 0 15.011719 22.941406 C 15.042513 22.407841 15.456843 22 16 22 z" />
    </svg>
  )
}

function PlayIcon(props: { size?: number }) {
  const s = props.size ?? 20
  return (
    <svg width={s} height={s} viewBox="0 0 30 30" fill="currentColor">
      <path d="M 6 3 A 1 1 0 0 0 5 4 L 5 26 A 1 1 0 0 0 6.58 26.81 L 26.42 15.91 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.39 14.08 L 6.58 3.19 A 1 1 0 0 0 6 3 z" />
    </svg>
  )
}

function VolumeNoneIcon(props: { opacity?: number }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ opacity: props.opacity ?? 0.7 }}>
      <path d="M16.3333 4.66669L13.5286 7.33335H11C9.89533 7.33335 9 8.22869 9 9.33335V10.6667C9 11.7714 9.89533 12.6667 11 12.6667H13.5286L16.3333 15.3334V4.66669Z" />
    </svg>
  )
}

function VolumeMaxIcon(props: { opacity?: number }) {
  return (
    <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor" style={{ opacity: props.opacity ?? 0.7 }}>
      <path d="M 20.037109 5.6464844 A 1.0001 1.0001 0 0 0 19.236328 7.2734375 C 20.963426 9.4832305 22 12.243759 22 15.255859 C 22 18.055119 21.105815 20.636923 19.59375 22.763672 A 1.0001 1.0001 0 1 0 21.222656 23.921875 C 22.962591 21.474623 24 18.4826 24 15.255859 C 24 11.78396 22.799402 8.5851757 20.8125 6.0429688 A 1.0001 1.0001 0 0 0 20.037109 5.6464844 z M 11 7 L 6.7929688 11 L 3 11 C 1.343 11 0 12.343 0 14 L 0 16 C 0 17.657 1.343 19 3 19 L 6.7929688 19 L 11 23 L 11 7 z M 14.738281 8.5917969 A 1.0001 1.0001 0 0 0 14.001953 10.291016 C 15.239451 11.587484 16 13.328154 16 15.255859 C 16 16.979025 15.392559 18.553804 14.380859 19.796875 A 1.0001 1.0001 0 1 0 15.931641 21.058594 C 17.219941 19.475665 18 17.450694 18 15.255859 C 18 12.799565 17.023721 10.559688 15.449219 8.9101562 A 1.0001 1.0001 0 0 0 14.738281 8.5917969 z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <path d="M9.16 1.12C9.51 1.35 9.6 1.81 9.38 2.16L5.14 8.66C5.02 8.84 4.82 8.97 4.6 8.99C4.39 9.02 4.17 8.95 4.01 8.81L1.25 6.31C0.94 6.03 0.92 5.56 1.19 5.25C1.47 4.94 1.95 4.92 2.25 5.2L4.36 7.1L8.12 1.34C8.35 0.99 8.81 0.9 9.16 1.12Z" />
    </svg>
  )
}

// ── Song data ──────────────────────────────────────────────────
const coverSmall = "https://placehold.co/48x48/png?text=+"
const coverLarge = "https://placehold.co/500x500/png?text=Album"

const songsQueue = [
  {
    name: "A Certain Romance",
    artist: "Arctic Monkeys",
    album: "Whatever People Say I Am",
    cover: coverSmall,
    length: "5:31",
  },
  { name: "Arabella", artist: "Arctic Monkeys", album: "AM", cover: coverSmall, length: "3:27" },
  { name: "Cornerstone", artist: "Arctic Monkeys", album: "Humbug", cover: coverSmall, length: "3:18" },
  { name: "Do I Wanna Know?", artist: "Arctic Monkeys", album: "AM", cover: coverSmall, length: "4:32" },
  {
    name: "Fluorescent Adolescent",
    artist: "Arctic Monkeys",
    album: "Favourite Worst Nightmare",
    cover: coverSmall,
    length: "2:58",
  },
]

const songsHistory = [
  { name: "Losing My Religion", artist: "R.E.M.", album: "Out of Time", cover: coverSmall, length: "4:26" },
  { name: "Karma Police", artist: "Radiohead", album: "OK Computer", cover: coverSmall, length: "4:22" },
  { name: "505", artist: "Arctic Monkeys", album: "Favourite Worst Nightmare", cover: coverSmall, length: "4:13" },
  { name: "There Is a Light", artist: "The Smiths", album: "The Queen Is Dead", cover: coverSmall, length: "4:02" },
  { name: "Bizarre Love Triangle", artist: "New Order", album: "Brotherhood", cover: coverSmall, length: "4:22" },
  { name: "Love Will Tear Us Apart", artist: "Joy Division", album: "Closer", cover: coverSmall, length: "3:26" },
  { name: "Biscuit Town", artist: "King Krule", album: "The OOZ", cover: coverSmall, length: "4:50" },
  {
    name: "Under the Bridge",
    artist: "Red Hot Chili Peppers",
    album: "Blood Sugar Sex Magik",
    cover: coverSmall,
    length: "4:24",
  },
  { name: "Maps", artist: "Yeah Yeah Yeahs", album: "Fever to Tell", cover: coverSmall, length: "3:39" },
  { name: "Heart of Glass", artist: "Blondie", album: "Parallel Lines", cover: coverSmall, length: "3:54" },
]

const albumsFavorites = [
  { name: "The OOZ", artist: "King Krule", cover: coverLarge, color: "hsl(205, 100%, 50%)" },
  { name: "OK Computer", artist: "Radiohead", cover: coverLarge, color: "hsl(0, 0%, 50%)" },
  { name: "AM", artist: "Arctic Monkeys", cover: coverLarge, color: "hsl(0, 0%, 30%)" },
  { name: "Out of Time", artist: "R.E.M.", cover: coverLarge, color: "hsl(220, 60%, 50%)" },
  { name: "Parallel Lines", artist: "Blondie", cover: coverLarge, color: "hsl(0, 80%, 50%)" },
]

const playlistsForYou = [
  { title: "Chill Vibes", caption: "Lo-fi beats for study", cover: coverLarge, color: "hsl(180, 50%, 40%)" },
  { title: "Indie Mix", caption: "Fresh indie tracks", cover: coverLarge, color: "hsl(280, 50%, 50%)" },
  { title: "Post-Punk Revival", caption: "Dark and driving", cover: coverLarge, color: "hsl(200, 40%, 40%)" },
  { title: "Rock Classics", caption: "Timeless anthems", cover: coverLarge, color: "hsl(0, 60%, 45%)" },
  { title: "Alt Nation", caption: "Alternative essentials", cover: coverLarge, color: "hsl(40, 70%, 50%)" },
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
            "box-shadow": `0 8px 48px -16px ${props.color.replace("hsl", "hsla").replace(")", ", 0.6)")}`,
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
            {[
              { label: "Normalize", state: "On", active: true },
              { label: "Equalizer", state: "On", active: true },
              { label: "3D Audio", state: "Off", active: false },
              { label: "Cross-Fade", state: "Off", active: false },
            ].map((feat) => (
              <div class={styles.soundFeature}>
                <button class={feat.active ? styles.iconBtnSolid : styles.iconBtnSoftGray}>
                  <svg width="16" height="16" viewBox="0 0 30 30" fill="currentColor">
                    <rect x="4" y="16" width="6" height="10" rx="1" />
                    <rect x="12" y="10" width="6" height="16" rx="1" />
                    <rect x="20" y="4" width="6" height="22" rx="1" />
                  </svg>
                </button>
                <div class={styles.flexCol}>
                  <span class={`${styles.textSm} ${styles.textMedium} ${styles.textCenter}`}>{feat.label}</span>
                  <span class={`${styles.textXs} ${styles.textMuted} ${styles.textCenter}`}>{feat.state}</span>
                </div>
              </div>
            ))}
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
                    style={{ height: "120px" }}
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
                <MagnifyingGlassIcon />
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
              <CounterClockwiseClockIcon />
            </button>
            <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
              <MixerHorizontalIcon />
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
            <For each={albumsFavorites}>
              {(a) => <AlbumCard title={a.name} caption={a.artist} cover={a.cover} color={a.color} />}
            </For>
          </div>

          {/* Now Playing Bar */}
          <div class={styles.nowPlaying}>
            <div class={styles.nowPlayingBg} />
            <div class={styles.nowPlayingContent}>
              <div class={`${styles.flexCenter} ${styles.gap4}`} style={{ padding: "12px" }}>
                <button class={`${styles.iconBtnSolid}`} style={{ width: "40px", height: "40px" }}>
                  <PlayIcon size={16} />
                </button>
                <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
                  <svg width="16" height="16" viewBox="0 0 30 30" fill="currentColor">
                    <path d="M 21 5 L 21 8 L 18.675781 8 C 16.670448 8 14.796256 9.00408 13.683594 10.671875 L 12 13.197266 L 10.316406 10.671875 C 9.2045791 9.0047337 7.329552 8 5.3242188 8 L 3 8 L 3 10 L 5.3242188 10 C 6.6628853 10 7.910171 10.668391 8.6523438 11.78125 L 10.798828 15 L 8.6523438 18.21875 C 7.910171 19.331609 6.6628854 20 5.3242188 20 L 3 20 L 3 22 L 5.3242188 22 C 7.3295521 22 9.2045792 20.995266 10.316406 19.328125 L 12 16.802734 L 13.683594 19.328125 C 14.796256 20.99592 16.670448 22 18.675781 22 L 21 22 L 21 25 L 27 21 L 21 17 L 21 20 L 18.675781 20 C 17.337115 20 16.090994 19.332955 15.347656 18.21875 L 13.201172 15 L 15.347656 11.78125 C 16.090994 10.667045 17.337115 10 18.675781 10 L 21 10 L 21 13 L 27 9 L 21 5 z" />
                  </svg>
                </button>
              </div>
              <div class={`${styles.flexCenter} ${styles.gap3}`}>
                <button class={`${styles.iconBtn} ${styles.iconBtnRound}`}>
                  <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor" style={{ opacity: 0.7 }}>
                    <path d="M 14 6 L 2.46 14.16 L 2.44 14.17 A 1 1 0 0 0 2 15 A 1 1 0 0 0 2.45 15.83 L 13.41 23.8 A 1 1 0 0 0 15 23 L 15 16.23 L 25.41 23.8 A 1 1 0 0 0 27 23 L 27 7 A 1 1 0 0 0 25.41 6.2 L 15 13.76 L 15 7 A 1 1 0 0 0 13.41 6.2 Z" />
                  </svg>
                </button>
                <div class={`${styles.flexCenter} ${styles.gap3}`}>
                  <img src={songsHistory[6]?.cover} width="48" height="48" style={{ "border-radius": "10px" }} />
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
                  <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor" style={{ opacity: 0.7 }}>
                    <path d="M 4 6 A 1 1 0 0 0 3 7 L 3 23 A 1 1 0 0 0 4.59 23.8 L 15 16.24 L 15 23 A 1 1 0 0 0 16.59 23.8 L 27.54 15.84 A 1 1 0 0 0 28 15 A 1 1 0 0 0 27.56 14.17 L 16.59 6.2 A 1 1 0 0 0 15 7 L 15 13.77 L 4.59 6.2 A 1 1 0 0 0 4 6 z" />
                  </svg>
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
                      <Switch.Control class={styles.switchControl}>
                        <Switch.Thumb class={styles.switchThumb} />
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
                  src={coverLarge}
                  style={{
                    "border-radius": "12px",
                    "box-shadow": "0 8px 80px -24px hsl(205, 100%, 50%)",
                  }}
                />
              </div>
              <div class={styles.mt5}>
                <div class={styles.stars}>
                  {[1, 2, 3, 4].map(() => (
                    <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor">
                      <path d="M15.765,2.434l2.875,8.512l8.983,0.104c0.773,0.009,1.093,0.994,0.473,1.455l-7.207,5.364l2.677,8.576 c0.23,0.738-0.607,1.346-1.238,0.899L15,22.147l-7.329,5.196c-0.63,0.447-1.468-0.162-1.238-0.899l2.677-8.576l-7.207-5.364 c-0.62-0.461-0.3-1.446,0.473-1.455l8.983-0.104l2.875-8.512C14.482,1.701,15.518,1.701,15.765,2.434z" />
                    </svg>
                  ))}
                  <svg width="20" height="20" viewBox="0 0 30 30" fill="currentColor">
                    <path d="M15 3.6l-3.5 10.7H.5l9 6.5-3.4 10.6 9-6.5 9 6.5-3.4-10.6 9-6.5H19.5z" opacity="0.3" />
                  </svg>
                </div>
                <h3 class={`${styles.h3} ${styles.textCenter} ${styles.mb2}`}>King Krule – The OOZ</h3>
                <p class={`${styles.textSm} ${styles.textMuted} ${styles.textCenter} ${styles.mb4}`}>
                  A dark and introspective album that showcases King Krule's distinctive blend of genres, while
                  delivering hauntingly raw and poetic lyrics.
                </p>
                <div class={`${styles.flex} ${styles.justifyCenter} ${styles.gap3}`}>
                  <Button class={`${styles.btn} ${styles.btnPrimary}`}>Listen Now</Button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoftGray}`} style={{ "border-radius": "8px" }}>
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
