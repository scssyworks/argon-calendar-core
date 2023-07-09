import { Month, Week } from '../constants';

export type CalendarConfig = {
  // Visible month count tell total number of months to be displayed
  visibleMonthCount: number;
  // Total number of visible weeks
  visibleWeekCount: number;
  // Week starting on
  weekStartsOn: Week;
};

export type RenderedMonth = {
  year: string;
  month: Month;
  monthIndex: number;
  weekLabels: Week[];
  dates: Date[];
};

export type RenderedMonths = RenderedMonth[];
