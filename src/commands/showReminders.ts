import { commands } from 'vscode';
import { getList, openTextDocument, showInformationMessage, showTextDocument } from '../utils';
import { EXTENSION, SHOW_REMINDERS } from '../constants';

// Local Constants
const TITLE = '# Reminders\n';
const MARKDOWN = 'markdown';
const INFO = 'There is no reminder...';

/**
 * Command: Show Reminders
 */
export function showReminders() {
  return commands.registerCommand(`${EXTENSION}.${SHOW_REMINDERS}`, async () => {
    if (getList().length > 0) {
      const reminders = getList().reduce(function(acc, reminder, idx) {
        return acc + `\n${idx + 1}. ${reminder}\n`;
      }, TITLE);

      const doc = await openTextDocument(reminders, MARKDOWN);

      showTextDocument(doc);
    } else {
      showInformationMessage(INFO);
    }
  });
}
