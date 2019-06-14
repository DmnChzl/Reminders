import { commands } from 'vscode';
import { getList, openTextDocument, showInformationMessage, showTextDocument, localize } from '../utils';
import { EXTENSION, SHOW_REMINDERS } from '../constants';

const MARKDOWN = 'markdown';

/**
 * Command: Show Reminders
 */
export function showReminders() {
  return commands.registerCommand(`${EXTENSION}.${SHOW_REMINDERS}`, async () => {
    if (getList().length > 0) {
      const reminders = getList().reduce(function(acc, reminder, idx) {
        return acc + `\n${idx + 1}. ${reminder}\n`;
      }, localize('hashtag_reminders'));

      const doc = await openTextDocument(reminders, MARKDOWN);

      showTextDocument(doc);
    } else {
      showInformationMessage(localize('no_reminder'));
    }
  });
}
