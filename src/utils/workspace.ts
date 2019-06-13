import { workspace } from 'vscode';
import { EXTENSION, LIST, PRESERVE, SHIFT } from '../constants';

const GLOBAL = true;
// const WORKSPACE = false;

/**      
 * Get Configuration
 *
 * @param {String} key Conf Key
 */
function getConf(key: string) {
  return workspace.getConfiguration(EXTENSION).get(key);
}

/**
 * Set Configuration
 *
 * @param {String} key Conf Key
 * @param {Any} value Conf Value
 */
function setConf(key: string, value: any) {
  return workspace.getConfiguration(EXTENSION).update(key, value, GLOBAL);
}

/**
 * Get List
 * 
 * @returns {Array} List
 */
export function getList(): string[] {
  return getConf(LIST) as string[] || [];
}

/**
 * Set List
 * 
 * @param {Array} values Values
 */
export function setList(values: string[]) {
  return setConf(LIST, values);
}

/**
 * Get Preserve
 * 
 * @returns {Boolean} Preserve
 */
export function getPreserve(): boolean {
  return getConf(PRESERVE) as boolean || false;
}

/**
 * Set Preserve
 * 
 * @param {Boolean} value Value
 */
export function setPreserve(value: boolean) {
  return setConf(PRESERVE, value);
}

/**
 * Get Shift
 * 
 * @returns {Boolean} Shift
 */
export function getShift(): number {
  return getConf(SHIFT) as number || 0;
}

/**
 * Set Shift
 * 
 * @param {Number} value Value
 */
export function setShift(value: number) {
  return setConf(SHIFT, value);
}

/**
 * Open Text Document (Async)
 *
 * @param {String} content Content Text
 * @param {String} language Language
 */
export async function openTextDocument(content: string, language: string) {
  return await workspace.openTextDocument({ content, language });
}
