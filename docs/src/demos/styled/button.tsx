import { Button } from "@danielfrg/ui/button"
import { ArrowRight, Check, Loader2, Mail, Plus, Send, Trash2 } from "lucide-solid"

export function ButtonShowcase() {
  return (
    <div class="flex flex-col gap-12">
      {/* Variants */}
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Variants</h2>
          <p class="text-sm text-muted-foreground mt-1">
            Buttons come in multiple variants to indicate different actions or emphasis levels.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p class="text-sm text-muted-foreground mt-1">
            Buttons can be rendered in different sizes to fit your layout needs.
          </p>
        </div>
        <div class="flex flex-wrap items-end gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* All Variants x Sizes Grid */}
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Variant &times; Size Matrix</h2>
          <p class="text-sm text-muted-foreground mt-1">Every variant at every size tier.</p>
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <Button size="xs">Extra Small</Button>
            <Button variant="outline" size="xs">
              Outline
            </Button>
            <Button variant="ghost" size="xs">
              Ghost
            </Button>
            <Button variant="destructive" size="xs">
              Destructive
            </Button>
            <Button variant="secondary" size="xs">
              Secondary
            </Button>
            <Button variant="link" size="xs">
              Link
            </Button>
            <Button variant="outline" size="xs">
              <Send /> Send
            </Button>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
            <Button variant="destructive" size="sm">
              Destructive
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
            <Button variant="link" size="sm">
              Link
            </Button>
            <Button variant="outline" size="sm">
              <Send /> Send
            </Button>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Button>Button</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="link">Link</Button>
            <Button variant="outline">
              <Send /> Send
            </Button>
            <Button variant="outline">
              Learn More <ArrowRight />
            </Button>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Button size="lg">Large</Button>
            <Button variant="outline" size="lg">
              Outline
            </Button>
            <Button variant="ghost" size="lg">
              Ghost
            </Button>
            <Button variant="destructive" size="lg">
              Destructive
            </Button>
            <Button variant="secondary" size="lg">
              Secondary
            </Button>
            <Button variant="link" size="lg">
              Link
            </Button>
            <Button variant="outline" size="lg">
              <Send /> Send
            </Button>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p class="text-sm text-muted-foreground mt-1">
            Buttons can include icons alongside text. SVGs are automatically sized.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button>
            <Mail /> Login with Email
          </Button>
          <Button variant="outline">
            <Send /> Send
          </Button>
          <Button variant="outline">
            Learn More <ArrowRight />
          </Button>
          <Button variant="destructive">
            <Trash2 /> Delete
          </Button>
          <Button variant="secondary">
            <Plus /> Create New
          </Button>
        </div>
      </section>

      {/* Icon Sizes */}
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Icon Sizes</h2>
          <p class="text-sm text-muted-foreground mt-1">Icon-only buttons are available in matching size variants.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button size="icon-xs" variant="outline">
            <Plus />
          </Button>
          <Button size="icon-sm" variant="outline">
            <Plus />
          </Button>
          <Button size="icon" variant="outline">
            <Plus />
          </Button>
          <Button size="icon-lg" variant="outline">
            <Plus />
          </Button>
        </div>
      </section>

      {/* Disabled */}
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Disabled State</h2>
          <p class="text-sm text-muted-foreground mt-1">Buttons can be disabled to prevent user interaction.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
        </div>
      </section>

      {/* Loading */}
      <section class="flex flex-col gap-4">
        <div>
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Loading State</h2>
          <p class="text-sm text-muted-foreground mt-1">Combine disabled with a spinning icon for loading states.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button disabled>
            <Loader2 class="animate-spin" />
            Please wait
          </Button>
          <Button variant="outline" disabled>
            <Loader2 class="animate-spin" />
            Loading...
          </Button>
          <Button variant="secondary" disabled>
            <Loader2 class="animate-spin" />
            Saving
          </Button>
        </div>
      </section>
    </div>
  )
}
