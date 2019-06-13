import { window } from 'vscode';

/**
 * Show Information Message
 *
 * @param {String} message Message
 */
export function showInformationMessage(message: string) {
  return window.showInformationMessage(message);
}

/**
 * Show Error Message
 *
 * @param {String} message Message
 */
export function showErrorMessage(message: string) {
  return window.showErrorMessage(message);
}

/**
 * Show Warning Message (Async)
 *
 * @param {String} message Message
 * @param {Array} options Options
 */
export async function showWarningMessage(message: string, ...options: string[]) {
  return await window.showWarningMessage(message, ...options);
}

/**
 * Show Input Box (Async)
 *
 * @param {String} placeHolder PlaceHolder
 */
export async function showInputBox(placeHolder: string) {
  return await window.showInputBox({
    placeHolder,
    value: ''
  });
}

/**
 * Show Text Document
 *
 * @param {Any} doc Document
 */
export function showTextDocument(doc: any) {
  return window.showTextDocument(doc);
}
