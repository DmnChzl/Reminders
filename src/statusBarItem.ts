import { window, workspace } from 'vscode';
import { getList } from './utils';
import { EXTENSION, SHOW_REMINDERS } from './constants';

// const LEFT = 1;
const RIGHT = 2;

const statusBarItem = window.createStatusBarItem(RIGHT);

statusBarItem.command = `${EXTENSION}.${SHOW_REMINDERS}`;

/**
 * Update StatusBarItem
 */
export function updateStatusBarItem() {
  const size = getList().length;

	if (size > 0) {
		statusBarItem.text = `${size} Reminder${size > 1 ? 's' : ''}`;
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}

export function onChangeConf() {
	return workspace.onDidChangeConfiguration(updateStatusBarItem);
}

export default statusBarItem;
