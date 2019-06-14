import { workspace } from 'vscode';
import { getList, setList, getPreserve, showWarningMessage, getShift, localize } from './utils';

interface CheckerData {
  content: string;
  hours: number;
  minutes: number;
  timer?: any;
}

const FULL_REGEX = /(2[0-3]|[01]?[0-9]):([0-5][0-9])$/g;
const HALF_REGEX = /(1[0-2]|0?[1-9])([ap]m)$/gi;

/**
 * Clock Checker (Async)
 *
 * @param {CheckerData} checkerData Checker Data ('content', 'hours', 'minutes')
 */
async function clockChecker({ content, hours, minutes, timer }: CheckerData) {
  const shift = Math.floor(Math.abs(getShift()));
  const now = new Date();

  // Handling Shift
  minutes = minutes - shift;

  do {
    if (minutes < 0) {
      hours--;
      minutes = 60 + minutes;
    }
  } while (minutes < 0);

  // Check Hours
  if (timer && hours < now.getHours()) {
    clearInterval(timer);
  } else if (hours === now.getHours()) {
    // Check Minutes
    if (timer && minutes < now.getMinutes()) {
      clearInterval(timer);
    } else if (minutes === now.getMinutes()) {
      if (timer) {
        clearInterval(timer);
      }

      const res = await showWarningMessage(content, localize('completed'));
      
      if (res === localize('completed')) {
        setList(getList().filter(item => item !== content));
      }
    }
  }
}

/**
 * Full Pattern
 *
 * @param {String} rmdr Reminder
 */
function fullPattern(rmdr: string) {
  if (FULL_REGEX.test(rmdr)) {
    const matches = rmdr.match(FULL_REGEX);
  
    if (matches) {
      const clock = matches[0].split(':');

      const hours = parseInt(clock[0]);
      const minutes = parseInt(clock[1]);

      // Timer
      let timer = setInterval(() => clockChecker({
        content: rmdr,
        hours,
        minutes,
        timer
      }), 30 * 1000); // Every 30 Seconds
    }
  }
}

/**
 * Half Pattern
 *
 * @param {String} rmdr Reminder
 */
function halfPattern(rmdr: string) {
  if (HALF_REGEX.test(rmdr)) {
    const matches = rmdr.match(HALF_REGEX);

    if (matches) {
      const clockLength = matches[0].length;
      let hours = parseInt(clockLength > 3 ? matches[0].substring(0, 2) : matches[0].substring(0, 1));
      const meridiem = clockLength > 3 ? matches[0].substring(2, clockLength) : matches[0].substring(1, clockLength);
      hours = meridiem.toLowerCase() === 'pm' ? hours + 12 : hours;
      
      // Timer
      let timer = setInterval(() => clockChecker({
        content: rmdr,
        hours,
        minutes: 0,
        timer
      }), 30 * 1000); // Every 30 Seconds
    }
  }
}

/**
 * Scheduled Reminders
 */
function scheduledReminders() {
  const reminders = getList();

  reminders.forEach((reminder: string) => {
    fullPattern(reminder);
    halfPattern(reminder);
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
	return workspace.onDidChangeConfiguration(scheduledReminders);
}

export default scheduledReminders;
