import * as Tabs from "@danielfrg/ui/tabs";
import styles from "./index.module.css";

export function DemoTabsHero() {
	return (
		<Tabs.Root defaultValue="account" class={styles.root}>
			<Tabs.List class={styles.list}>
				<Tabs.Trigger value="account" class={styles.trigger}>
					Account
				</Tabs.Trigger>
				<Tabs.Trigger value="password" class={styles.trigger}>
					Password
				</Tabs.Trigger>
				<Tabs.Trigger value="settings" class={styles.trigger}>
					Settings
				</Tabs.Trigger>
				<Tabs.Indicator class={styles.indicator} />
			</Tabs.List>
			<Tabs.Content value="account" class={styles.content}>
				<p>Manage your account details and preferences.</p>
			</Tabs.Content>
			<Tabs.Content value="password" class={styles.content}>
				<p>Change your password and security settings.</p>
			</Tabs.Content>
			<Tabs.Content value="settings" class={styles.content}>
				<p>Configure your application settings.</p>
			</Tabs.Content>
		</Tabs.Root>
	);
}
