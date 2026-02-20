import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"

const copyButtonTransformer = {
  name: "copy-button",
  pre(node) {
    node.properties["data-code"] = this.source
  },
}

// https://astro.build/config
export default defineConfig({
  site: "https://ui.danielfrg.com",
  integrations: [solid(), mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "github-dark",
      },
      transformers: [copyButtonTransformer],
    },
  },
})
