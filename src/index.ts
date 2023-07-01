import { WEEKS, Week } from './constants';
import type { CalendarConfig, RenderedMonths } from './types';
import { generateMonth } from './utils';

export class Calendar {
  #weekStartIndex: number;
  #currentDate: Date = new Date();
  #calendarConfig: CalendarConfig;
  #renderedMonths: RenderedMonths = [];

  constructor(config: Partial<CalendarConfig> = {}) {
    const { visibleMonthCount, visibleWeekCount, weekStartsOn } = config;
    this.#calendarConfig = Object.freeze({
      visibleMonthCount: visibleMonthCount ?? 1,
      visibleWeekCount: visibleWeekCount ?? 6,
      weekStartsOn: weekStartsOn ?? Week.SUN
    });
    this.#weekStartIndex = WEEKS.findIndex(
      (week) => this.#calendarConfig.weekStartsOn === week
    );
  }

  getDate(offset = 0): Date {
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

  today() {
    return this.getDate();
  }

  isToday(compareDate: Date) {
    const dt = this.today();
    return (
      dt.getFullYear() === compareDate.getFullYear() &&
      dt.getMonth() === compareDate.getMonth() &&
      dt.getDate() === compareDate.getDate()
    );
  }

  output() {
    return this.#renderedMonths;
  }

  create(offset = 0) {
    const { visibleMonthCount, visibleWeekCount } = this.#calendarConfig;
    const currentDate = this.today();
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

  map<T>(transformCallback?: (input: Date) => T) {
    const transformedMonths = [];
    if (typeof transformCallback === 'function') {
      for (const month of this.#renderedMonths) {
        const transformedMonth = {
          ...month,
          dates: [] as T[]
        };
        for (const date of month.dates) {
          transformedMonth.dates.push(transformCallback(date));
        }
        transformedMonths.push(transformedMonth);
      }
      return transformedMonths;
    }
    return this.#renderedMonths;
  }

  reset() {
    this.#renderedMonths.length = 0;
  }
}

export const calendar = new Calendar();
export * from './constants';
export * from './types';
