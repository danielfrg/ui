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
						{ label: 'Button', slug: 'components/button' },
						{ label: 'Checkbox', slug: 'components/checkbox' },
						{ label: 'Meter', slug: 'components/meter' },
						{ label: 'RadioGroup', slug: 'components/radio-group' },
						{ label: 'Separator', slug: 'components/separator' },
						{ label: 'Switch', slug: 'components/switch' },
						{ label: 'Toggle', slug: 'components/toggle-button' },
						{ label: 'ToggleGroup', slug: 'components/toggle-group' },
					],
				},
			],
		}),
	],
});
