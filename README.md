[![CodeQL](https://github.com/scssyworks/argon-calendar-core/actions/workflows/codeql.yml/badge.svg)](https://github.com/scssyworks/argon-calendar-core/actions/workflows/codeql.yml)

# Argon Calendar Core

"Argon Calendar Core" is a JavaScript library that provides a robust set of core
APIs specifically designed for building customizable calendars. As a developer,
you have the freedom to choose any view engine that suits your needs, allowing
you to dive right into the development process. Moreover, this library provides
a set of handy functions that greatly simplify the calendar building process,
enabling you to create dynamic and interactive calendars effortlessly.

# Install

```sh
npm i argon-calendar-core
```

# Usage

### Calendar object:

Generate a calendar using `calendar` object.

```ts
import { calendar } from "argon-calendar-core";
console.log(
  calendar.create().output(),
);

/**
 *  Output:
 * [{
 *   year: '2023',
 *   month: 'june',
 *   monthIndex: 5,
 *   weekLabels: ['sunday', 'monday', 'tuesday', ...],
 *   dates: [2023-05-27T18:30:00.000Z, 2023-05-28T18:30:00.000Z, 2023-05-29T18:30:00.000Z, ...]
 * }]
 */
```

### Calendar class:

Customize a calendar using `Calendar` class.

```ts
import { Calendar, Week } from "argon-calendar-core";
const calendar = new Calendar({
  visibleMonthCount: 1, // Show one month at a time. The default value is 1.
  visibleWeekCount: 6, // Show 6 weeks in a month. The default value is 6.
  weekStartsOn: Week.SUN, // Start the week on "sunday". The default value is "sunday".
});
console.log(
  calendar.create().output(),
);

/**
 *  Output:
 * [{
 *   year: '2023',
 *   month: 'june',
 *   monthIndex: 5,
 *   weekLabels: ['sunday', 'monday', 'tuesday', ...],
 *   dates: [2023-05-27T18:30:00.000Z, 2023-05-28T18:30:00.000Z, 2023-05-29T18:30:00.000Z, ...]
 * }]
 */
```

### Formatting:

The API allows to format output as per your preference. The default output
contains list of dates in a raw `Date` format. The following example converts
date to string format.

```ts
import { Calendar, Week } from "argon-calendar-core";
const calendar = new Calendar({
  visibleMonthCount: 1, // Show one month at a time
  visibleWeekCount: 6, // Show 6 weeks in a month
  weekStartsOn: Week.SUN, // Start the week on "sunday"
});
console.log(
  calendar.create().map<string>((dt) => dt.toString()),
);

/**
 *  Output:
 * [{
 *   year: '2023',
 *   month: 'june',
 *   monthIndex: 5,
 *   weekLabels: ['sunday', 'monday', 'tuesday', ...],
 *   dates: [
 *     'Sun May 28 2023 00:00:00 GMT+0530 (India Standard Time)',
 *     'Mon May 29 2023 00:00:00 GMT+0530 (India Standard Time)',
 *     'Tue May 30 2023 00:00:00 GMT+0530 (India Standard Time)',
 *     ...
 *   ]
 * }]
 */
```

### Generate previous or next month(s)

Use an `offset` parameter to generate previous or next month's data.

```ts
// Assuming current month is June 2023
// ...
console.log(
  calendar.create(+1).output(),
); // Outputs month of July

console.log(
  calendar.create(+2).output(),
); // Outputs month of August

console.log(
  calendar.create(-1).output(),
); // Outputs month of May

console.log(
  calendar.create(-2).output(),
); // Outputs month of April
```

### Helper methods

| Method                                                           | Description                                             |
| ---------------------------------------------------------------- | ------------------------------------------------------- |
| `static getDate(offset: number): Date`                           | Returns current or offset date                          |
| `static today(): Date`                                           | Returns current date                                    |
| `static isToday(inputDate: Date): boolean`                       | Returns `true` if provided date is same as today's date |
| `static compare(inputDate: Date, comparisonDate: Date): boolean` | Returns `true` if input dates are the same              |

# Support

Calendar core API is supported for both `nodejs` as well as `browser`
environments. You can also use it with bundlers such as `webpack`, `parcel` and
`rollup`.

# Contributing

We welcome contributions from the community to enhance the plugin's
functionality and address any issues. If you have any feedback, bug reports, or
feature requests, please don't hesitate to
[open an issue](https://github.com/scssyworks/argon-calendar-core/issues) or
submit a
[pull request](https://github.com/scssyworks/argon-calendar-core/pulls).
