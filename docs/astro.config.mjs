// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid(),
		starlight({
			title: '@danielfrg/ui',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			customCss: ['./src/styles/site.css'],
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'Introduction', slug: 'index' },
					],
				},
				{
					label: 'Components',
				items: [
					{ label: 'Accordion', slug: 'components/accordion' },
				{ label: 'Alert Dialog', slug: 'components/alert-dialog' },
					{ label: 'Avatar', slug: 'components/avatar' },
					{ label: 'Button', slug: 'components/button' },
				{ label: 'Checkbox', slug: 'components/checkbox' },
			{ label: 'Collapsible', slug: 'components/collapsible' },
			{ label: 'Combobox', slug: 'components/combobox' },
			{ label: 'Context Menu', slug: 'components/context-menu' },
			{ label: 'Dialog', slug: 'components/dialog' },
			{ label: 'Input', slug: 'components/input' },
				{ label: 'Menu', slug: 'components/menu' },
			{ label: 'Menubar', slug: 'components/menubar' },
			{ label: 'Navigation Menu', slug: 'components/navigation-menu' },
				{ label: 'Number Field', slug: 'components/number-field' },
				{ label: 'Meter', slug: 'components/meter' },
				{ label: 'Popover', slug: 'components/popover' },
				{ label: 'Preview Card', slug: 'components/preview-card' },
				{ label: 'Progress', slug: 'components/progress' },
					{ label: 'RadioGroup', slug: 'components/radio-group' },
					{ label: 'Select', slug: 'components/select' },
					{ label: 'Separator', slug: 'components/separator' },
					{ label: 'Slider', slug: 'components/slider' },
					{ label: 'Switch', slug: 'components/switch' },
					{ label: 'Tabs', slug: 'components/tabs' },
					{ label: 'Toast', slug: 'components/toast' },
					{ label: 'Toggle', slug: 'components/toggle-button' },
						{ label: 'ToggleGroup', slug: 'components/toggle-group' },
						{ label: 'Tooltip', slug: 'components/tooltip' },
					],
				},
			],
		}),
	],
});
