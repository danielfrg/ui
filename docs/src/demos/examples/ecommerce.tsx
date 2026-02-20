import { createSignal, For, type JSX } from "solid-js"
import { Button } from "@danielfrg/ui/button"
import { Separator } from "@danielfrg/ui/separator"
import * as Switch from "@danielfrg/ui/switch"
import {
  Bookmark as BookmarkIconLucide,
  Search as MagnifyingGlassIcon,
  Trash2 as CrumpledPaperIconLucide,
  Calendar as CalendarIconLucide,
  Image as ImageIcon,
  Video as VideoIcon,
  Bold as FontBoldIcon,
  Italic as FontItalicIcon,
  Strikethrough as StrikethroughIcon,
  AlignLeft as TextAlignLeftIcon,
  AlignCenter as TextAlignCenterIcon,
  AlignRight as TextAlignRightIcon,
  Instagram as InstagramLogoIcon,
  Ruler as RulerHorizontalIcon,
  WandSparkles as MagicWandIcon,
} from "lucide-solid"
import styles from "./ecommerce.module.css"

// ── Icon wrappers ──────────────────────────────────────────────
function BookmarkIcon() {
  return <BookmarkIconLucide size={15} />
}

function BookmarkFilledIcon() {
  return <BookmarkIconLucide size={15} fill="currentColor" />
}

function CrumpledPaperIcon(props: { width?: number; height?: number }) {
  return <CrumpledPaperIconLucide size={props.width ?? 15} />
}

function CalendarIcon() {
  return <CalendarIconLucide size={12} />
}

// ── Toggle Buttons Component ───────────────────────────────────
function ToggleButtons(props: {
  values: string[]
  value: string | string[]
  onChange: (v: any) => void
  multiple?: boolean
  children?: (value: string) => JSX.Element
}) {
  const isActive = (v: string) => (Array.isArray(props.value) ? props.value.includes(v) : props.value === v)

  return (
    <For each={props.values}>
      {(val) => (
        <button
          class={`${styles.toggleBtn} ${isActive(val) ? styles.toggleBtnActive : ""}`}
          onClick={() => {
            if (props.multiple && Array.isArray(props.value)) {
              props.onChange(isActive(val) ? props.value.filter((x: string) => x !== val) : [...props.value, val])
            } else {
              props.onChange(val)
            }
          }}
        >
          {props.children ? props.children(val) : val}
        </button>
      )}
    </For>
  )
}

// Color swatch helper
const swatchColors: Record<string, string> = {
  White: "white",
  Gray: "oklch(60% 0 0)",
  Black: "#1B1B18",
  Red: "oklch(55% 0.2 25deg)",
  Pink: "oklch(65% 0.2 350deg)",
  Violet: "oklch(50% 0.2 290deg)",
  Blue: "oklch(55% 0.18 260deg)",
  Green: "oklch(55% 0.15 170deg)",
  Beige: "#E5DFCF",
}

// ── Main E-commerce Component ──────────────────────────────────
export function ExampleEcommerce() {
  const [sneakersBookmarked, setSneakersBookmarked] = createSignal(false)
  const [jeansBookmarked, setJeansBookmarked] = createSignal(false)
  const [delivery, setDelivery] = createSignal("")
  const [size, setSize] = createSignal("9")
  const [material, setMaterial] = createSignal("")
  const [color, setColor] = createSignal("")
  const [productMaterial, setProductMaterial] = createSignal("")
  const [productColor, setProductColor] = createSignal("")
  const [productSizes, setProductSizes] = createSignal<string[]>([])

  return (
    <div class={styles.layout}>
      {/* ── Column 1 ──────────────────────────────────────── */}
      <div class={`${styles.col} ${styles.col1}`}>
        {/* Promo Card */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <img
            class={styles.productImg}
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=424&q=80"
            width="280"
            height="212"
            style={{ "margin-bottom": "8px" }}
          />
          <div class={styles.flexBetween}>
            <div>
              <a
                class={styles.linkBold}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ "font-size": "0.875rem" }}
              >
                Back to basics
              </a>
              <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0" }}>
                Simple and versatile
              </p>
            </div>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Shop now</Button>
          </div>
        </div>

        {/* Sneakers Product */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div style={{ position: "relative", "margin-bottom": "8px" }}>
            <img
              class={styles.productImg}
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=540&q=80"
              width="280"
              height="270"
            />
            <button class={styles.bookmarkBtn} onClick={() => setSneakersBookmarked(!sneakersBookmarked())}>
              {sneakersBookmarked() ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            </button>
          </div>
          <div class={`${styles.flexBetween} ${styles.alignEnd} ${styles.mb2}`}>
            <div>
              <a
                class={styles.textSm}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  "margin-bottom": "4px",
                  display: "block",
                  color: "var(--ui-foreground)",
                  "text-decoration": "none",
                }}
              >
                Footwear
              </a>
              <h3 class={styles.h3}>Sneakers #12</h3>
            </div>
            <span class={styles.text2Xl}>$149</span>
          </div>
          <p class={`${styles.textSm} ${styles.textMuted} ${styles.mb4}`} style={{ margin: "0 0 16px" }}>
            Love at the first sight for enthusiasts seeking a fresh and whimsical style.
          </p>
          <Separator class={styles.separator} style={{ margin: "16px 0" }} />
          <div class={`${styles.flex} ${styles.gap2} ${styles.alignEnd}`}>
            <div class={`${styles.flexCol} ${styles.flexGrow}`}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Color</label>
              <select class={styles.select}>
                <option>Pastel</option>
                <option>Bright</option>
              </select>
            </div>
            <div class={styles.flexCol} style={{ "min-width": "80px" }}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Size</label>
              <select class={styles.select}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option>{i * 0.5 + 5}</option>
                ))}
              </select>
            </div>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Buy</Button>
          </div>
        </div>

        {/* Filter Panel */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div class={`${styles.flexCol} ${styles.gap5}`}>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Delivery</div>
              <div class={`${styles.grid2} ${styles.gap1}`}>
                <ToggleButtons values={["Tomorrow", "Within 3 days"]} value={delivery()} onChange={setDelivery} />
              </div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Size</div>
              <div class={`${styles.grid5} ${styles.gap1}`}>
                <ToggleButtons
                  values={["5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"]}
                  value={size()}
                  onChange={setSize}
                />
              </div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Material</div>
              <div class={`${styles.grid4} ${styles.gap1}`}>
                <ToggleButtons
                  values={["Leather", "Suede", "Mesh", "Canvas"]}
                  value={material()}
                  onChange={setMaterial}
                />
              </div>
            </div>
            <div>
              <div class={`${styles.textSm} ${styles.textBold} ${styles.mb2}`}>Color</div>
              <div class={`${styles.grid3} ${styles.gap1}`}>
                <ToggleButtons values={Object.keys(swatchColors)} value={color()} onChange={setColor}>
                  {(val) => (
                    <>
                      <span class={styles.swatch} style={{ background: swatchColors[val] }} />
                      {val}
                    </>
                  )}
                </ToggleButtons>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Cart */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <h3 class={`${styles.h3} ${styles.mb3}`}>Shopping cart</h3>
          <div class={`${styles.flexCol} ${styles.gap3}`}>
            {[
              {
                name: "Poncho #4",
                url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80&crop=entropy",
                caption: "Size M",
                count: "1",
                price: "$79",
              },
              {
                name: "Jeans #8",
                url: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80&crop=entropy",
                caption: "Size 30",
                count: "2",
                price: "$118",
              },
              {
                name: "Sneakers #14",
                url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80&crop=center",
                caption: "Size 8",
                count: "1",
                price: "$116",
              },
            ].map((item) => (
              <div class={`${styles.flexCenter} ${styles.justifyBetween} ${styles.gap4}`}>
                <div class={`${styles.flexCenter} ${styles.gap2} ${styles.flexGrow}`} style={{ height: "32px" }}>
                  <img src={item.url} class={styles.productImgSmall} />
                  <div>
                    <a
                      class={styles.linkBold}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{ "font-size": "0.875rem" }}
                    >
                      {item.name}
                    </a>
                    <div class={`${styles.textXs} ${styles.textMuted}`}>{item.caption}</div>
                  </div>
                </div>
                <select class={`${styles.select} ${styles.selectSm}`} style={{ width: "48px" }}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <option selected={String(i + 1) === item.count}>{i + 1}</option>
                  ))}
                </select>
                <span class={`${styles.textSm} ${styles.textBold}`} style={{ width: "40px", "text-align": "right" }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
          <Separator class={styles.separator} style={{ margin: "16px 0" }} />
          <div class={styles.flexBetween}>
            <span class={styles.textSm}>
              Total <strong>$313</strong>
            </span>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Go to checkout</Button>
          </div>
        </div>
      </div>

      {/* ── Column 2 ──────────────────────────────────────── */}
      <div class={`${styles.col} ${styles.col2}`}>
        {/* Jeans Product */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div style={{ position: "relative", "margin-bottom": "8px" }}>
            <img
              class={styles.productImg}
              src="https://images.unsplash.com/photo-1577210897949-1f56f943bf82?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=540&q=80&crop=bottom"
              width="280"
              height="270"
            />
            <button class={styles.bookmarkBtn} onClick={() => setJeansBookmarked(!jeansBookmarked())}>
              {jeansBookmarked() ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            </button>
          </div>
          <div class={`${styles.flexBetween} ${styles.alignEnd} ${styles.mb2}`}>
            <div>
              <a
                class={styles.textSm}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: "block",
                  "margin-bottom": "4px",
                  color: "var(--ui-foreground)",
                  "text-decoration": "none",
                }}
              >
                Pants and jeans
              </a>
              <h3 class={styles.h3}>Jeans #7</h3>
            </div>
            <span class={styles.text2Xl}>$149</span>
          </div>
          <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0 0 16px" }}>
            Jeans with a sense of nostalgia, as if they carry whispered tales of past adventures.
          </p>
          <Separator class={styles.separator} style={{ margin: "16px 0" }} />
          <div class={`${styles.flex} ${styles.gap2} ${styles.alignEnd}`}>
            <div class={`${styles.flexCol} ${styles.flexGrow}`}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Color</label>
              <select class={styles.select}>
                <option>Lighter</option>
                <option>Darker</option>
              </select>
            </div>
            <div class={styles.flexCol}>
              <label class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>Size</label>
              <select class={styles.select}>
                {Array.from({ length: 17 }, (_, i) => (
                  <option>{i + 24}</option>
                ))}
              </select>
            </div>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Add to cart</Button>
          </div>
        </div>

        {/* Promo 2 */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <img
            class={styles.productImg}
            src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&h=424&q=80"
            width="280"
            height="212"
            style={{ "margin-bottom": "8px" }}
          />
          <div class={styles.flexBetween}>
            <div>
              <a
                class={`${styles.linkHighContrast} ${styles.textSm}`}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ display: "block", "margin-bottom": "4px" }}
              >
                Pants and jeans
              </a>
              <p class={`${styles.textSm} ${styles.textMuted}`} style={{ margin: "0" }}>
                Break the fashion norms
              </p>
            </div>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Shop now</Button>
          </div>
        </div>

        {/* Delivery */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <h3 class={`${styles.h3} ${styles.mb3}`}>Delivery</h3>
          <span
            class={`${styles.badge} ${styles.badgeAmber}`}
            style={{ position: "absolute", top: "8px", right: "8px" }}
          >
            Guaranteed
          </span>
          <div class={styles.mb4}>
            <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Tomorrow</div>
            <div class={styles.textSm}>12:00 pm – 2:00 pm</div>
          </div>
          <div class={styles.mb4}>
            <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Luna Rodriguez</div>
            <div class={styles.textSm}>9876 Maple Avenue</div>
            <div class={styles.textSm}>Cityville, WA 54321</div>
          </div>
          <img
            class={styles.productImg}
            src="https://workos.imgix.net/images/bc04b345-f225-488d-8a46-1811096d0c3b.png?auto=format&fit=clip&q=90&w=840&h=654"
            width="280"
            height="218"
            style={{ "margin-bottom": "16px" }}
          />
          <div class={`${styles.flexEnd} ${styles.gap2}`}>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Edit</Button>
            <Button class={`${styles.btn} ${styles.btnSolid}`}>Confirm</Button>
          </div>
        </div>

        {/* Bookmarks */}
        <div class={`${styles.card} ${styles.cardSm}`}>
          <div class={`${styles.flexBetween} ${styles.mb2}`}>
            <h3 class={styles.h3}>Bookmarks</h3>
            <Button class={`${styles.btn} ${styles.btnGhost} ${styles.btnXs}`}>Buy all</Button>
          </div>
          <div class={`${styles.grid2} ${styles.gap2}`} style={{ "row-gap": "16px" }}>
            {[
              {
                name: "Jeans #8",
                url: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=272&h=272&q=80&crop=entropy",
                price: "$118",
              },
              {
                name: "Jacket #3",
                url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&crop=entropy&w=272&h=272&q=80",
                price: "$49",
              },
              {
                name: "Pants #10",
                url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=272&h=272&q=80",
                price: "$32",
              },
              {
                name: "Shirt #11",
                url: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=272&h=272&q=80",
                price: "$39",
              },
            ].map((item) => (
              <div>
                <img src={item.url} style={{ "border-radius": "3px", width: "100%", "margin-bottom": "8px" }} />
                <span class={`${styles.textSm} ${styles.textMuted}`}>
                  <a
                    class={styles.linkBold}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "font-size": "0.875rem" }}
                  >
                    {item.name}
                  </a>
                  , {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 3: Edit Product, Orders ────────────────── */}
      <div class={`${styles.col} ${styles.col3}`}>
        {/* Product Discarded */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <div class={`${styles.flexCol} ${styles.alignCenter} ${styles.py2}`}>
            <div class={styles.mb2}>
              <CrumpledPaperIcon width={24} height={24} />
            </div>
            <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb1}`}>Product discarded</h3>
            <p class={`${styles.textSm} ${styles.textMuted} ${styles.mb4}`} style={{ margin: "0 0 16px" }}>
              It's still available in the{" "}
              <a class={styles.link} href="#" onClick={(e) => e.preventDefault()}>
                archive
              </a>
              .
            </p>
            <div class={`${styles.flex} ${styles.gap2}`}>
              <Button class={`${styles.btn} ${styles.btnSoft}`}>Undo</Button>
              <Button class={`${styles.btn} ${styles.btnSolid}`}>Done</Button>
            </div>
          </div>
        </div>

        {/* Edit Product */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb4}`}>Edit product</h3>
          <div class={`${styles.grid5} ${styles.gap2} ${styles.mb4}`}>
            <div class={styles.span4of5}>
              <label
                class={`${styles.textSm} ${styles.textBold}`}
                style={{ display: "inline-block", "margin-bottom": "8px" }}
              >
                Title
              </label>
              <input class={styles.inputField} value="Skirt #16" />
            </div>
            <div>
              <label
                class={`${styles.textSm} ${styles.textBold}`}
                style={{ display: "inline-block", "margin-bottom": "8px" }}
              >
                Price
              </label>
              <input class={styles.inputField} value="$99" />
            </div>
          </div>
          <div class={styles.mb4}>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Media
            </div>
            <div class={`${styles.grid3} ${styles.gap2}`}>
              <img
                class={styles.mediaImg}
                src="https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80&crop=bottom"
              />
              <img
                class={styles.mediaImg}
                src="https://workos.imgix.net/images/c773ee38-9136-49d1-804c-6d166dad9c65.png?auto=format&fit=clip&q=80w=400&h=400"
              />
              <div class={styles.mediaUpload}>
                <div class={`${styles.grid2} ${styles.gap2}`} style={{ padding: "8px" }}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <ImageIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <VideoIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <InstagramLogoIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <RulerHorizontalIcon size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class={styles.mb4}>
            <label
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Description
            </label>
            <div style={{ position: "relative" }}>
              <textarea class={styles.textarea} rows={10} spellcheck={false}>
                Amidst the soft hues and delicate silence, one's gaze is always drawn towards this skirt. The fabric
                seems to possess a story of its own, woven with threads of history and whispered secrets. Its savory
                color, reminiscent of lush meadows in spring, holds the promise of new beginnings. Delicate ruffles
                cascade elegantly, like gentle waves lapping against an untouched shore.
              </textarea>
              <div class={styles.textareaToolbar}>
                <div class={`${styles.flex} ${styles.gap1}`}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <FontItalicIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <FontBoldIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <StrikethroughIcon size={15} />
                  </button>
                </div>
                <div class={`${styles.flex} ${styles.gap1}`}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <TextAlignLeftIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <TextAlignCenterIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <TextAlignRightIcon size={15} />
                  </button>
                </div>
                <div class={`${styles.flex} ${styles.gap1}`}>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <MagicWandIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <ImageIcon size={15} />
                  </button>
                  <button class={`${styles.iconBtn} ${styles.iconBtnSoft}`}>
                    <CrumpledPaperIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class={styles.mb4}>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Main material
            </div>
            <div class={`${styles.grid3} ${styles.gap1}`}>
              <ToggleButtons
                values={["Synthetic", "Wool", "Cotton", "Linen", "Denim", "Leather", "Silk", "Chiffon", "Other"]}
                value={productMaterial()}
                onChange={setProductMaterial}
              />
            </div>
          </div>
          <div class={styles.mb4}>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Main color
            </div>
            <div class={`${styles.grid3} ${styles.gap1}`}>
              <ToggleButtons values={Object.keys(swatchColors)} value={productColor()} onChange={setProductColor}>
                {(val) => (
                  <>
                    <span class={styles.swatch} style={{ background: swatchColors[val] }} />
                    {val}
                  </>
                )}
              </ToggleButtons>
            </div>
          </div>
          <div>
            <div
              class={`${styles.textSm} ${styles.textBold}`}
              style={{ display: "inline-block", "margin-bottom": "8px" }}
            >
              Sizes
            </div>
            <div class={`${styles.grid3} ${styles.gap1}`}>
              <ToggleButtons
                multiple
                values={["XS", "S", "M", "L", "XL"]}
                value={productSizes()}
                onChange={setProductSizes}
              />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <div class={`${styles.flexBetween} ${styles.mb4}`}>
            <h3 class={`${styles.h3} ${styles.h3Lg}`}>Orders</h3>
            <Button class={`${styles.btn} ${styles.btnGhost} ${styles.btnSm}`} style={{ "margin-right": "-8px" }}>
              <CalendarIcon /> <span class={styles.textSm}>May 2023</span>
            </Button>
          </div>
          <div class={`${styles.ordersGrid} ${styles.mb4}`}>
            <span class={`${styles.textSm} ${styles.textMuted}`}>Order no.</span>
            <span class={`${styles.textSm} ${styles.textMuted}`}>Payment</span>
            <span class={`${styles.textSm} ${styles.textMuted}`}>Fulfillment</span>
            <span class={`${styles.textSm} ${styles.textMuted} ${styles.textRight}`}>Amount</span>
            <div class={styles.spanFull}>
              <Separator class={styles.separator} />
            </div>
            {(
              [
                {
                  id: 1005,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Delivering",
                  fulColor: "Amber" as const,
                  amount: "$154.60",
                },
                {
                  id: 1004,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Unfulfilled",
                  fulColor: "Amber" as const,
                  amount: "$93.49",
                },
                {
                  id: 1003,
                  pay: "Refunded",
                  payColor: "Gray" as const,
                  ful: "Cancelled",
                  fulColor: "Red" as const,
                  amount: "$39.00",
                },
                {
                  id: 1002,
                  pay: "Unpaid",
                  payColor: "Amber" as const,
                  ful: "Unfulfilled",
                  fulColor: "Amber" as const,
                  amount: "$438.90",
                },
                {
                  id: 1001,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Fulfilled",
                  fulColor: "Teal" as const,
                  amount: "$532.64",
                },
                {
                  id: 1000,
                  pay: "Paid",
                  payColor: "Teal" as const,
                  ful: "Fulfilled",
                  fulColor: "Teal" as const,
                  amount: "$625.03",
                },
              ] as const
            ).map((order) => {
              const badgeClass = (c: string) =>
                c === "Teal"
                  ? styles.badgeTeal
                  : c === "Red"
                    ? styles.badgeRed
                    : c === "Amber"
                      ? styles.badgeAmber
                      : styles.badgeGray
              return (
                <>
                  <a
                    class={`${styles.linkHighContrast} ${styles.textSm}`}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "margin-bottom": "4px", display: "block" }}
                  >
                    Footwear
                  </a>
                  <span>
                    <span class={`${styles.badge} ${badgeClass(order.payColor)}`}>{order.pay}</span>
                  </span>
                  <span>
                    <span class={`${styles.badge} ${badgeClass(order.fulColor)}`}>{order.ful}</span>
                  </span>
                  <span class={`${styles.textSm} ${styles.textRight}`}>{order.amount}</span>
                </>
              )
            })}
          </div>
          <div class={styles.flexEnd}>
            <Button class={`${styles.btn} ${styles.btnSoft}`}>Show more</Button>
          </div>
        </div>
      </div>

      {/* ── Column 4: Shipment, Promo, Top Customers ──────── */}
      <div class={`${styles.col} ${styles.col4}`}>
        {/* Shipment Tracking */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb4}`}>Shipment tracking</h3>
          <div class={`${styles.inputWithIcon} ${styles.mb5}`}>
            <span class={styles.inputIcon}>
              <MagnifyingGlassIcon size={15} />
            </span>
            <input class={styles.inputField} placeholder="Enter package number" />
          </div>
          <div class={styles.grid2}>
            <div class={`${styles.flexCol} ${styles.gap4}`} style={{ "padding-right": "24px" }}>
              <div>
                <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Package number</div>
                <div class={styles.textMd}>LASC966124786554</div>
              </div>
              <div>
                <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Order number</div>
                <a class={styles.linkBold} href="#" onClick={(e) => e.preventDefault()} style={{ "font-size": "1rem" }}>
                  #94356
                </a>
              </div>
              <div>
                <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Ship to</div>
                <div class={`${styles.textMd} ${styles.mb1}`}>Sophia Martinez</div>
                <div class={`${styles.textSm} ${styles.textMuted}`}>
                  512 Oakwood Avenue, Unit 201, Greenville, SC 67890
                </div>
              </div>
              <div class={`${styles.grid3}`}>
                <div>
                  <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Status</div>
                  <span class={`${styles.badge} ${styles.badgeGreen}`}>On time</span>
                </div>
                <div>
                  <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Weight</div>
                  <div class={styles.textMd}>3 lb</div>
                </div>
                <div>
                  <div class={`${styles.textSm} ${styles.textBold} ${styles.mb1}`}>Order total</div>
                  <div class={styles.textMd}>$243</div>
                </div>
              </div>
            </div>
            <div class={styles.timeline}>
              <div class={styles.timelineLine} />
              {[
                { date: "July 1, 2023, 10:28 AM", text: "Package picked up from the warehouse in Phoenix, TX" },
                { date: "July 1, 2023, 12:43 PM", text: "Departed from Phoenix, TX" },
                { date: "July 2, 2023, 3:20 PM", text: "Arrived at a sorting facility in Seattle, WA" },
                { date: "July 2, 2023, 7:31 PM", text: "Departed Seattle, WA" },
                { date: "July 2, 2023, 11:03 PM", text: "Arrived to a facility in Greenville, WA" },
              ].map((evt) => (
                <div class={styles.timelineEvent}>
                  <div class={styles.timelineDot} />
                  <div class={`${styles.textXs} ${styles.textMuted} ${styles.mb1}`}>{evt.date}</div>
                  <div class={styles.textSm}>{evt.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div class={`${styles.card} ${styles.cardMd}`} style={{ padding: "0" }}>
          <div class={styles.promoGrid}>
            <div class={styles.promoCell}>
              <h3 class={`${styles.h3} ${styles.h3Xl} ${styles.mb2}`}>Dare to stand out</h3>
              <p class={`${styles.textMd} ${styles.mb3}`}>Striking patterns, vibrant hues, and unusual designs.</p>
              <Button class={`${styles.btn} ${styles.btnSolid}`}>Shop now</Button>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1514866747592-c2d279258a78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" />
            </div>
            <div
              class={styles.promoCell}
              style={{ "font-size": "0.75rem", color: "var(--ui-muted)", "line-height": "20px" }}
            >
              <span style={{ "margin-right": "6px" }}>Men's</span>
              {[
                "Polo #11",
                "Shirt #12",
                "Shirt #24",
                "Sneakers #3",
                "Jeans #9",
                "T\u2011shirt #4",
                "Pants #20",
                "Socks #9",
                "Watch #15",
                "Belt #7",
                "Bag #6",
                "Shirt #16",
                "Suit #17",
                "Shorts #22",
                "Shoes #13",
              ].map((p) => (
                <>
                  <a
                    class={styles.linkHighContrast}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "margin-right": "6px" }}
                  >
                    {p}
                  </a>
                  <wbr />
                </>
              ))}
              <span style={{ "margin-right": "6px" }}>Women's</span>
              {[
                "Blouse #16",
                "Dress #3",
                "Skirt #22",
                "Heels #13",
                "Sandals #18",
                "Bag #14",
                "Scarf #19",
                "Earrings #23",
                "Bracelet #21",
                "Necklace #25",
                "Glasses #26",
                "Perfume #27",
              ].map((p) => (
                <>
                  <a
                    class={styles.linkHighContrast}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "margin-right": "6px" }}
                  >
                    {p}
                  </a>
                  <wbr />
                </>
              ))}
            </div>
            <div>
              <img src="https://plus.unsplash.com/premium_photo-1668485968648-f29fe5157463?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" />
            </div>
            <div class={`${styles.promoCell} ${styles.flexCol} ${styles.alignCenter} ${styles.justifyBetween}`}>
              <span class={`${styles.textXs} ${styles.textCenter} ${styles.textMuted}`}>
                15{"\u2009"}–{"\u2009"}30 Mar
              </span>
              <span class={styles.text4Xl} style={{ "margin-right": "16px", "margin-bottom": "12px" }}>
                −25%
              </span>
              <span class={`${styles.textXs} ${styles.textCenter} ${styles.textMuted}`}>Get our boldest designs.</span>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1532660621034-fb55e2e59762?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80" />
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div class={`${styles.card} ${styles.cardMd}`}>
          <h3 class={`${styles.h3} ${styles.h3Lg} ${styles.mb4}`}>Top customers</h3>
          <div class={`${styles.flex} ${styles.gap2} ${styles.mb5}`}>
            <div class={`${styles.inputWithIcon} ${styles.flexGrow}`}>
              <span class={styles.inputIcon}>
                <MagnifyingGlassIcon size={15} />
              </span>
              <input class={styles.inputField} placeholder="Search" />
            </div>
            <select class={styles.select} style={{ "min-width": "140px" }}>
              <option>All customers</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
          <div class={`${styles.flexCol} ${styles.gap5}`}>
            {[
              {
                name: "Elijah Wilson",
                address: "735 Pine Street, Apartment 4C, Portland, OR 34567",
                since: "November 3, 2017",
                sales: "$15,432.56",
                orders: 42,
              },
              {
                name: "Cameron Johnson",
                address: "2465 Main Street, Apt 3B, Springfield, OH 12345",
                since: "June 10, 2020",
                sales: "$13,976.43",
                orders: 12,
              },
              {
                name: "Sophia Martinez",
                address: "512 Oakwood Avenue, Unit 201, Greenville, SC 67890",
                since: "September 27, 2019",
                sales: "$11,653.03",
                orders: 34,
              },
              {
                name: "Nathan Thompson",
                address: "837 Maple Lane, Suite 102, Lexington, KY 45678",
                since: "May 5, 2018",
                sales: "$8,245.92",
                orders: 22,
              },
              {
                name: "Olivia Adams",
                address: "1123 Elmwood Drive, Boulder, CO 23456",
                since: "January 12, 2021",
                sales: "$6,789.21",
                orders: 18,
              },
            ].map((c) => (
              <div class={styles.customerRow}>
                <div>
                  <a
                    class={styles.linkBold}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ "font-size": "1rem" }}
                  >
                    {c.name}
                  </a>
                  <div class={`${styles.textSm} ${styles.mb2}`}>Customer since {c.since}</div>
                  <div class={`${styles.textXs} ${styles.textMuted}`}>{c.address}</div>
                </div>
                <div class={styles.customerStats}>
                  <div class={styles.customerStat}>
                    <span class={`${styles.textSm} ${styles.textMuted} ${styles.textRight}`}>Sales</span>
                    <span class={`${styles.text2Xl} ${styles.textRight}`}>{c.sales}</span>
                  </div>
                  <div class={styles.separatorV} />
                  <div class={styles.customerStat} style={{ "min-width": "70px" }}>
                    <span class={`${styles.textSm} ${styles.textMuted}`}>Orders</span>
                    <span class={styles.text2Xl}>{c.orders}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
