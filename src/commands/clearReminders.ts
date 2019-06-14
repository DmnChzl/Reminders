import { commands } from 'vscode';
import { setList, showInformationMessage, showWarningMessage, localize } from '../utils';
import { EXTENSION, CLEAR_REMINDERS } from '../constants';

const OPTIONS = [localize('yes'), localize('no')];

/**
 * Command: Clear All Reminders
 */
export function clearReminders() {
  return commands.registerCommand(`${EXTENSION}.${CLEAR_REMINDERS}`, async () => {
    const res = await showWarningMessage(localize('clear_all_reminders'), ...OPTIONS);

    if (res === localize('yes')) {
      setList([]).then(() => showInformationMessage(localize('done')));
    }
  });
}
