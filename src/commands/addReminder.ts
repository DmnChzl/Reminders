import { commands } from 'vscode';
import { getList, setList, showInformationMessage, showInputBox, showErrorMessage, localize } from '../utils';
import { EXTENSION, ADD_REMINDER } from '../constants';

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
    const reminder = await showInputBox(localize('sample'));

    if (reminder) {
      const alreadyExist = getList().find(item => item === reminder);

      if (!alreadyExist) {
        addToList(reminder).then(() => showInformationMessage(localize('added')));
      } else {
        showErrorMessage(localize('already_exist'));
      }
    }
  });
}
