import { Calendar, ERR_MAP, MONTHS, WEEKS, Week, calendar } from '../src';
import { version } from '../package.json';

describe('calendar instance', () => {
  let today: Date;
  let dt: Date;
  let dayOffset: number;
  let calendarStart: Date;
  beforeEach(() => {
    today = Calendar.today();
    dt = new Date(today.getFullYear(), today.getMonth());
    dayOffset = dt.getDay() - WEEKS.findIndex((wk) => wk === Week.SUN);
    if (dayOffset < 0) {
      dayOffset = 7 + dayOffset;
    }
    calendarStart = new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate() - dayOffset
    );
  });
  test('should get version', () => {
    expect(calendar.version).toBe(version);
  });
  test('should render current month', () => {
    const calendarOutput = calendar.create().output();
    expect(calendarOutput.length).toBe(1);
    expect(calendarOutput[0].month).toBe(MONTHS[dt.getMonth()]);
    expect(calendarOutput[0].year).toBe(dt.getFullYear().toString());
    expect(calendarOutput[0].dates.length).toBe(6 * 7); // 6 weeks x 7 days
    expect(calendarOutput[0].weekLabels[0]).toBe(Week.SUN);
    expect(calendarOutput[0].weekLabels.length).toBe(7);
    expect(WEEKS[calendarOutput[0].dates[0].getDay()]).toBe(Week.SUN);
  });
  test('should format dates', () => {
    const calendarOutput = calendar.create().map<string>((d) => d.toString());
    expect(calendarOutput.length).toBe(1);
    expect(calendarOutput[0].month).toBe(MONTHS[dt.getMonth()]);
    expect(calendarOutput[0].year).toBe(dt.getFullYear().toString());
    expect(calendarOutput[0].dates.length).toBe(6 * 7); // 6 weeks x 7 days
    expect(calendarOutput[0].weekLabels[0]).toBe(Week.SUN);
    expect(calendarOutput[0].weekLabels.length).toBe(7);
    expect(calendarOutput[0].dates[0]).toBe(calendarStart.toString());
  });
  test('should throw an error if map function is called with invalid value', () => {
    // biome-ignore lint/suspicious/noExplicitAny: Suppressing rule for testing
    expect(() => calendar.create().map('test' as any)).toThrowError(ERR_MAP);
  });
  test('should render next month', () => {
    const calendarOutput = calendar.create(+1).output();
    const nextMonth = new Date(dt.getFullYear(), dt.getMonth() + 1);
    expect(calendarOutput.length).toBe(1);
    expect(calendarOutput[0].month).toBe(MONTHS[nextMonth.getMonth()]);
    expect(calendarOutput[0].year).toBe(nextMonth.getFullYear().toString());
    expect(calendarOutput[0].dates.length).toBe(6 * 7); // 6 weeks x 7 days
    expect(calendarOutput[0].weekLabels[0]).toBe(Week.SUN);
    expect(calendarOutput[0].weekLabels.length).toBe(7);
    expect(WEEKS[calendarOutput[0].dates[0].getDay()]).toBe(Week.SUN);
  });
  test('should render previous month', () => {
    const calendarOutput = calendar.create(-1).output();
    const prevMonth = new Date(dt.getFullYear(), dt.getMonth() - 1);
    expect(calendarOutput.length).toBe(1);
    expect(calendarOutput[0].month).toBe(MONTHS[prevMonth.getMonth()]);
    expect(calendarOutput[0].year).toBe(prevMonth.getFullYear().toString());
    expect(calendarOutput[0].dates.length).toBe(6 * 7); // 6 weeks x 7 days
    expect(calendarOutput[0].weekLabels[0]).toBe(Week.SUN);
    expect(calendarOutput[0].weekLabels.length).toBe(7);
    expect(WEEKS[calendarOutput[0].dates[0].getDay()]).toBe(Week.SUN);
  });
  test('should get todays date', () => {
    expect(today.getDate()).toBe(new Date().getDate());
  });
  test('should get offset date', () => {
    expect(Calendar.getDate(+1).getDate()).toBe(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      ).getDate()
    );
  });
});

describe('Calendar class', () => {
  let today: Date;
  let dt: Date;
  beforeEach(() => {
    today = Calendar.today();
    dt = new Date(today.getFullYear(), today.getMonth());
  });
  test('should create new instance of calendar', () => {
    expect(new Calendar()).toBeInstanceOf(Calendar);
  });
  test('should render correctly if config is not set', () => {
    const calendar = new Calendar();
    const calendarOutput = calendar.create().output();
    expect(calendarOutput.length).toBe(1);
    expect(calendarOutput[0].month).toBe(MONTHS[dt.getMonth()]);
    expect(calendarOutput[0].year).toBe(dt.getFullYear().toString());
    expect(calendarOutput[0].dates.length).toBe(6 * 7); // 6 weeks x 7 days
    expect(calendarOutput[0].weekLabels[0]).toBe(Week.SUN);
    expect(calendarOutput[0].weekLabels.length).toBe(7);
    expect(WEEKS[calendarOutput[0].dates[0].getDay()]).toBe(Week.SUN);
  });
  test('should render correctly if config is incorrectly not set', () => {
    const calendar = new Calendar({
      visibleMonthCount: undefined,
      visibleWeekCount: undefined,
      weekStartsOn: undefined
    });
    const calendarOutput = calendar.create().output();
    expect(calendarOutput.length).toBe(1);
    expect(calendarOutput[0].month).toBe(MONTHS[dt.getMonth()]);
    expect(calendarOutput[0].year).toBe(dt.getFullYear().toString());
    expect(calendarOutput[0].dates.length).toBe(6 * 7); // 6 weeks x 7 days
    expect(calendarOutput[0].weekLabels[0]).toBe(Week.SUN);
    expect(calendarOutput[0].weekLabels.length).toBe(7);
    expect(WEEKS[calendarOutput[0].dates[0].getDay()]).toBe(Week.SUN);
  });
  test('should create new instance of calendar with updated config', () => {
    const calendar = new Calendar({
      visibleMonthCount: 2,
      visibleWeekCount: 7,
      weekStartsOn: Week.FRI
    });
    const calendarOutput = calendar.create().output();
    expect(calendarOutput.length).toBe(2);
    expect(calendarOutput[0].month).toBe(MONTHS[dt.getMonth()]);
    expect(calendarOutput[0].year).toBe(dt.getFullYear().toString());
    expect(calendarOutput[0].dates.length).toBe(7 * 7); // 7 weeks x 7 days
    expect(calendarOutput[0].weekLabels[0]).toBe(Week.FRI);
    expect(calendarOutput[0].weekLabels.length).toBe(7);
    expect(WEEKS[calendarOutput[0].dates[0].getDay()]).toBe(Week.FRI);
  });
  test('should validate input date as todays date', () => {
    expect(Calendar.isToday(today)).toBeTruthy();
    expect(Calendar.isToday(new Date(2022, 10))).toBeFalsy();
  });
  test('should validate input date with comparison date', () => {
    expect(
      Calendar.compare(new Date(2022, 10), new Date(2022, 10))
    ).toBeTruthy();
    expect(
      Calendar.compare(new Date(2022, 10), new Date(2022, 11))
    ).toBeFalsy();
  });
});
