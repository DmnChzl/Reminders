import { commands } from 'vscode';
import { getList, setList, showInformationMessage, showInputBox, showErrorMessage } from '../utils';
import { EXTENSION, ADD_REMINDER } from '../constants';

// Local Constants
const SAMPLE = 'Don\'t forget to take a break at 4pm';
const ADDED = 'Added !';
const ERROR = 'Already exist !';

// ShortCut: Preserve 'N' Add To List
function addToList(item: string) {
  return setList([
    ...getList(),
    item
  ]);
}

/**
 * Command: Add New Reminder
 */
export function addReminder() {
  return commands.registerCommand(`${EXTENSION}.${ADD_REMINDER}`, async () => {
    const reminder = await showInputBox(SAMPLE);

    if (reminder) {
      const alreadyExist = getList().find(item => item === reminder);

      if (!alreadyExist) {
        addToList(reminder).then(() => showInformationMessage(ADDED));
      } else {
        showErrorMessage(ERROR);
      }
    }
  });
}
