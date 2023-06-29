import { WEEKS, Week } from './constants';
import type { CalendarConfig, RenderedMonths } from './types';
import { generateMonth } from './utils';

export class Calendar {
  #weekStartIndex: number;
  #currentDate: Date = new Date();
  #calendarConfig: CalendarConfig;
  #renderedMonths: RenderedMonths = [];

  constructor(config: CalendarConfig = {}) {
    this.#calendarConfig = Object.freeze(
      Object.assign(
        {
          visibleMonthCount: 1,
          visibleWeekCount: 6,
          weekStartsOn: Week.SUN
        } as CalendarConfig,
        config
      )
    );
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
    return new Date(currentDay.getTime() + millisecondsOffset);
  }

  today() {
    return this.getDate();
  }

  output() {
    return this.#renderedMonths;
  }

  create(offset = 0) {
    const { visibleMonthCount = 1, visibleWeekCount = 6 } =
      this.#calendarConfig;
    const currentDate = this.today();
    const monthToRender = currentDate.getMonth() + offset;
    if (this.#renderedMonths.length) {
      this.#renderedMonths.length = 0;
    }
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
}

export const calendar = new Calendar();
export * from './constants';
export * from './types';
