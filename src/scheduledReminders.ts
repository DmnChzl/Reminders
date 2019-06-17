import { workspace } from 'vscode';
import Timers from './classes/Timers';
import Clock from './interfaces/Clock';
import { getList, setList, getPreserve, showWarningMessage, getShift, localize } from './utils';

const timers = new Timers();

// RegExp
const HOUR_REGEX = /(2[0-3]|[01]?[0-9])[h]([0-5][0-9])?$/g;
const TWO_DOT_REGEX = /(2[0-3]|[01]?[0-9])[:]([0-5][0-9])$/g;
const MERIDIEM_REGEX = /(1[0-2]|0?[1-9])([ap]m)$/gi;

/**
 * Recursive Timeout
 *
 * @param {Clock} clock Clock
 */
function recursiveTimeout({ hours, minutes }: Clock) {
  const shift = Math.floor(Math.abs(getShift()));

  let h = hours;
  let m = minutes - shift;

  // Handling Shift
  do {
    if (m < 0) {
      h--;
      m = 60 + m;
    }
  } while (m < 0);

  let delay = 1;

  return (reminder: string) => {
    const now = new Date();

    // Check Hours
    if (h < now.getHours()) {
      return;
    } else if (h > now.getHours()) {
      // Every Minutes
      delay = 60;
    } else {
      // Check Minutes
      if (m < now.getMinutes()) {
        return;
      } else if (m > now.getMinutes()) {
        // Every Seconds
        delay = 1;
      } else {
        showWarningMessage(reminder, localize('completed')).then(res => {
          if (res === localize('completed')) {
            setList(getList().filter(item => item !== reminder));
          }
        });

        return;
      }
    }

    const timeout = recursiveTimeout({ hours, minutes });
    timers.append(setTimeout(() => timeout(reminder), delay * 1000));
  };
}

/**
 * Hour Pattern
 *
 * @param {String} reminder Reminder
 * @returns {Boolean} Is Matching
 */
function hourPattern(reminder: string): boolean {
  if (HOUR_REGEX.test(reminder)) {
    const matches = reminder.match(HOUR_REGEX);

    if (matches) {
      const clock = matches[0].split('h');
      const hours = parseInt(clock[0]);
      const minutes = parseInt(clock[1]) || 0;

      // Timer
      const timeout = recursiveTimeout({ hours, minutes });
      timeout(reminder);

      return true;
    }
    return false;
  }
  return false;
}

/**
 * Two Dot Pattern
 *
 * @param {String} reminder Reminder
 * @returns {Boolean} Is Matching
 */
function twoDotPattern(reminder: string): boolean {
  if (TWO_DOT_REGEX.test(reminder)) {
    const matches = reminder.match(TWO_DOT_REGEX);

    if (matches) {
      const clock = matches[0].split(':');
      const hours = parseInt(clock[0]);
      const minutes = parseInt(clock[1]);

      // Timer
      const timeout = recursiveTimeout({ hours, minutes });
      timeout(reminder);

      return true;
    }
    return false;
  }
  return false;
}

/**
 * Meridiem Pattern
 *
 * @param {String} reminder Reminder
 * @returns {Boolean} Is Matching
 */
function meridiemPattern(reminder: string): boolean {

  if (MERIDIEM_REGEX.test(reminder)) {
    const matches = reminder.match(MERIDIEM_REGEX);

    if (matches) {
      const hours = matches[0].length > 3 ? matches[0].substring(0, 2) : matches[0].substring(0, 1);
      const meridiem = matches[0].length > 3 ? matches[0].substring(2) : matches[0].substring(1);

      // Timer
      const timeout = recursiveTimeout({
        hours: meridiem.toLowerCase() === 'pm' ? parseInt(hours) + 12 : parseInt(hours),
        minutes: 0
      });
      timeout(reminder);

      return true;
    }
    return false;
  }
  return false;
}

/**
 * Scheduled Reminders
 */
function scheduledReminders() {
  const reminders = getList();

  reminders.forEach((reminder: string) => {
    // Handling '8h' Or '23h15' Pattern
    if (hourPattern(reminder)) {
      return;
    }

    // Handling '8:00' Or '23:45' Pattern
    if (twoDotPattern(reminder)) {
      return;
    }

    // Handling '8am' Or '11pm' Pattern
    if (meridiemPattern(reminder)) {
      return;
    }
  });
}

/**
 * Initialize Scheduled Reminders
 */
export function initScheduledReminders() {
  if (getPreserve()) {
    scheduledReminders();
  } else {
    // Reset
    setList([]);
  }
}

export function onChangeConf() {
  return workspace.onDidChangeConfiguration(() => {
    // Clear All Timeouts
    timers.get().forEach(timeout => clearTimeout(timeout));
    timers.reset();

    scheduledReminders();
  });
}

export default scheduledReminders;
