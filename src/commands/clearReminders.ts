import { commands } from 'vscode';
import { setList, showInformationMessage, showWarningMessage } from '../utils';
import { EXTENSION, CLEAR_REMINDERS } from '../constants';

// Local Constants
const WARNING = 'Do you want to clear all reminders ?';
const YES = 'Yes';
const NO = 'No';
const DONE = 'Done.';

/**
 * Command: Clear All Reminders
 */
export function clearReminders() {
  return commands.registerCommand(`${EXTENSION}.${CLEAR_REMINDERS}`, async () => {
    const res = await showWarningMessage(WARNING, YES, NO);

    if (res === YES) {
      setList([]).then(() => showInformationMessage(DONE));
    }
  });
}
