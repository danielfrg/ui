export type SidebarItem = {
  label: string
  slug?: string
  link?: string
}

export type SidebarSection = {
  title: string
  items: SidebarItem[]
}

export const sidebar: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Introduction", slug: "index" },
      { label: "Examples", slug: "examples" },
      { label: "Acknowledgements", slug: "acknowledgements" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Accordion", slug: "components/accordion" },
      { label: "Alert Dialog", slug: "components/alert-dialog" },
      { label: "Autocomplete", slug: "components/autocomplete" },
      { label: "Avatar", slug: "components/avatar" },
      { label: "Button", slug: "components/button" },
      { label: "Checkbox", slug: "components/checkbox" },
      { label: "Checkbox Group", slug: "components/checkbox-group" },
      { label: "Collapsible", slug: "components/collapsible" },
      { label: "Combobox", slug: "components/combobox" },
      { label: "Context Menu", slug: "components/context-menu" },
      { label: "Dialog", slug: "components/dialog" },
      { label: "Drawer", slug: "components/drawer" },
      { label: "Field", slug: "components/field" },
      { label: "Fieldset", slug: "components/fieldset" },
      { label: "Form", slug: "components/form" },
      { label: "Input", slug: "components/input" },
      { label: "Menu", slug: "components/menu" },
      { label: "Menubar", slug: "components/menubar" },
      { label: "Navigation Menu", slug: "components/navigation-menu" },
      { label: "Number Field", slug: "components/number-field" },
      { label: "Meter", slug: "components/meter" },
      { label: "Popover", slug: "components/popover" },
      { label: "Preview Card", slug: "components/preview-card" },
      { label: "Progress", slug: "components/progress" },
      { label: "RadioGroup", slug: "components/radio-group" },
      { label: "Scroll Area", slug: "components/scroll-area" },
      { label: "Select", slug: "components/select" },
      { label: "Separator", slug: "components/separator" },
      { label: "Slider", slug: "components/slider" },
      { label: "Switch", slug: "components/switch" },
      { label: "Tabs", slug: "components/tabs" },
      { label: "Toast", slug: "components/toast" },
      { label: "Toggle", slug: "components/toggle-button" },
      { label: "ToggleGroup", slug: "components/toggle-group" },
      { label: "Tooltip", slug: "components/tooltip" },
    ],
  },
]
