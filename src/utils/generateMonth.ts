import type { RenderedMonth } from '../types';
import { MONTHS, WEEKS, Week } from '../constants';

export function generateMonth(
  today: Date,
  month: number,
  weekStartsOn: number,
  totalWeeks: number
): RenderedMonth {
  const cal = new Date(today.getFullYear(), month);
  const dates: Date[] = [];
  const weekLabels: Week[] = [];
  const renderDay = cal.getDay();
  let totalDays = totalWeeks * 7; // 7 days in a week
  let dayOffset = renderDay - weekStartsOn;
  if (dayOffset < 0) {
    dayOffset = 7 + dayOffset;
  }
  let renderDate = cal.getDate() - dayOffset;
  while (totalDays !== 0) {
    const dt = new Date(cal.getFullYear(), cal.getMonth(), renderDate);
    if (weekLabels.length < 7) {
      weekLabels.push(WEEKS[dt.getDay()]);
    }
    dates.push(dt);
    renderDate += 1;
    totalDays -= 1;
  }
  const monthIndex = cal.getMonth();
  return {
    year: `${cal.getFullYear()}`,
    month: MONTHS[monthIndex],
    monthIndex,
    weekLabels,
    dates
  };
}
