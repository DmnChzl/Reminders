import { ExtensionContext } from 'vscode';
import { initScheduledReminders, onChangeConf } from './scheduledReminders';
import statusBarItem, { onChangeConf as onStatusBarItemChange, updateStatusBarItem } from './statusBarItem';
import { addReminder, clearReminders, showReminders } from './commands';

export function activate({ subscriptions }: ExtensionContext) {
	// console.log('"Reminders" is now alive !');

	subscriptions.push(onChangeConf());

	// StatusBarItem
	subscriptions.push(statusBarItem);
	subscriptions.push(onStatusBarItemChange());

	subscriptions.push(addReminder());
	subscriptions.push(clearReminders());
	subscriptions.push(showReminders());

	initScheduledReminders();
	updateStatusBarItem();
}

export function deactivate() {}
