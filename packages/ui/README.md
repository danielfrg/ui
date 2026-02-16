# @danielfrg/ui

A SolidJS collection of unstyled UI components. Based on [Kobalte](https://kobalte.dev/) and [Base UI](https://base-ui.com/).

## Installation

```bash
npm install @danielfrg/ui
```

## Usage

Import components using subpath exports:

```tsx
import * as Dialog from "@danielfrg/ui/dialog"
import * as Tabs from "@danielfrg/ui/tabs"
import { Button } from "@danielfrg/ui/button"
```

This package ships raw TypeScript/TSX source and relies on the `solid` export condition. Your bundler (e.g. `vite-plugin-solid`) compiles the JSX at build time.

## Components

Accordion, Alert Dialog, Autocomplete, Avatar, Button, Checkbox, Checkbox Group, Collapsible, Combobox, Context Menu, Dialog, Drawer, Field, Fieldset, Form, Input, Listbox, Menu, Menubar, Meter, Navigation Menu, Number Field, Popover, Preview Card, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle Button, Toggle Group, Tooltip.
