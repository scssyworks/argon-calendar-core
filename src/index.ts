import { ERR_MAP, WEEKS, Week } from './constants';
import type { CalendarConfig, RenderedMonths } from './types';
import { generateMonth } from './utils';
import { version as ver } from '../package.json';

export class Calendar {
  static #currentDate: Date = new Date();
  #weekStartIndex: number;
  #calendarConfig: CalendarConfig;
  #renderedMonths: RenderedMonths = [];

  constructor({
    visibleMonthCount,
    visibleWeekCount,
    weekStartsOn
  }: Partial<CalendarConfig> = {}) {
    this.#calendarConfig = Object.freeze({
      visibleMonthCount: visibleMonthCount ?? 1,
      visibleWeekCount: visibleWeekCount ?? 6,
      weekStartsOn: weekStartsOn ?? Week.SUN
    });
    this.#weekStartIndex = WEEKS.findIndex(
      (week) => this.#calendarConfig.weekStartsOn === week
    );
  }

  static getDate(offset = 0): Date {
    const currentDay = new Date(
      this.#currentDate.getFullYear(),
      this.#currentDate.getMonth(),
      this.#currentDate.getDate()
    );
    if (offset === 0) {
      return currentDay;
    }
    const millisecondsOffset = offset * 24 * 60 * 60 * 1000;
    currentDay.setTime(currentDay.getTime() + millisecondsOffset);
    return currentDay;
  }

  static today() {
    return this.getDate();
  }

  static isToday(compareDate: Date) {
    const dt = this.today();
    return this.compare(dt, compareDate);
  }

  static compare(inputDate: Date, compareDate: Date) {
    return (
      inputDate.getFullYear() === compareDate.getFullYear() &&
      inputDate.getMonth() === compareDate.getMonth() &&
      inputDate.getDate() === compareDate.getDate()
    );
  }

  output(): RenderedMonths {
    return this.#renderedMonths;
  }

  create(offset = 0) {
    const { visibleMonthCount, visibleWeekCount } = this.#calendarConfig;
    const currentDate = Calendar.today();
    const monthToRender = currentDate.getMonth() + offset;
    this.reset();
    for (let i = 0; i < visibleMonthCount; i += 1) {
      this.#renderedMonths.push(
        generateMonth(
          currentDate,
          monthToRender + i,
          this.#weekStartIndex,
          visibleWeekCount
        )
      );
    }
    return this;
  }

  map<T>(transformCallback: (input: Date) => T): RenderedMonths<T> {
    const transformedMonths = [];
    if (typeof transformCallback === 'function') {
      return this.#renderedMonths.map((renderedMonth) => {
        return {
          ...renderedMonth,
          dates: renderedMonth.dates.map(transformCallback)
        };
      });
    }
    throw new Error(ERR_MAP);
  }

  reset() {
    this.#renderedMonths.length = 0;
  }

  get version() {
    return ver;
  }
}

export const calendar = new Calendar();
export * from './constants';
export * from './types';
