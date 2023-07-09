import { Month, Week } from '../constants';

export type CalendarConfig = {
  // Visible month count tell total number of months to be displayed
  visibleMonthCount: number;
  // Total number of visible weeks
  visibleWeekCount: number;
  // Week starting on
  weekStartsOn: Week;
};

export type RenderedMonthMeta = {
  year: string;
  month: Month;
  monthIndex: number;
  weekLabels: Week[];
};

export interface RenderedMonth<T = Date> extends RenderedMonthMeta {
  dates: T[];
}

export type RenderedMonths<T = Date> = RenderedMonth<T>[];
