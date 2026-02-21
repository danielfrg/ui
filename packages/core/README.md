# @danielfrg/ui-core

A SolidJS collection of unstyled, headless UI components. Based on [Kobalte](https://kobalte.dev/) and [Base UI](https://base-ui.com/).

For styled components with a shadcn-inspired Tailwind theme, see [`@danielfrg/ui`](https://github.com/danielfrg/ui/tree/main/packages/ui).

## Installation

```bash
npm install @danielfrg/ui-core
```

## Usage

Import components using subpath exports:

```tsx
import * as Dialog from "@danielfrg/ui-core/dialog"
import * as Tabs from "@danielfrg/ui-core/tabs"
import { Button } from "@danielfrg/ui-core/button"
```

This package ships raw TypeScript/TSX source and relies on the `solid` export condition. Your bundler (e.g. `vite-plugin-solid`) compiles the JSX at build time.

## Components

Accordion, Alert Dialog, Autocomplete, Avatar, Button, Checkbox, Checkbox Group, Collapsible, Combobox, Context Menu, Dialog, Drawer, Field, Fieldset, Form, Input, Listbox, Menu, Menubar, Meter, Navigation Menu, Number Field, Popover, Preview Card, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle Button, Toggle Group, Tooltip.
