import { env } from 'vscode';
import * as I18n from '../constants/i18n';

/**
 * Get Language
 */
function getLang(): string {
  return env.language;
}

/**
 * Localize
 *
 * @param {String} key Key 
 */
export function localize(key: string): string {
  key = key.toUpperCase();
  const localizedKey = `${getLang().toUpperCase()}_${key}`;
  return (I18n as any)[localizedKey] || (I18n as any)[key];
}
