[![CodeQL](https://github.com/scssyworks/argon-calendar-core/actions/workflows/codeql.yml/badge.svg)](https://github.com/scssyworks/argon-calendar-core/actions/workflows/codeql.yml)

# Argon Calendar Core

"Argon Calendar Core" is a core API for calendar

# Install

```sh
npm i argon-calendar-core
```

# Usage

Create a calendar using default `calendar` object or customize using `Calendar`
class.

### Default:

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
 *   weekLabels: ['sunday', 'monday', 'tuesday', ...],
 *   dates: [2023-05-27T18:30:00.000Z, 2023-05-28T18:30:00.000Z, 2023-05-29T18:30:00.000Z, ...]
 * }]
 */
```

### Customize:

```ts
import { Calendar, Week } from "argon-calendar-core";
const calendar = new Calendar({
  visibleMonthCount: 1, // Show one month at a time
  visibleWeekCount: 6, // Show 6 weeks in a month
  weekStartsOn: Week.SUN, // Start the week on "sunday"
});
console.log(
  calendar.create().output(),
);

/**
 *  Output:
 * [{
 *   year: '2023',
 *   month: 'june',
 *   weekLabels: ['sunday', 'monday', 'tuesday', ...],
 *   dates: [2023-05-27T18:30:00.000Z, 2023-05-28T18:30:00.000Z, 2023-05-29T18:30:00.000Z, ...]
 * }]
 */
```

### Format:

The default output contains list of dates in a raw `Date` format. You can format
it to a human readable form using `map` method.

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

### Render previous or next month(s) by passing an offset

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

# Support

Calendar core API is supported in `nodejs` and can also be used with bundlers
like `webpack`, `parcel` and `rollup`.

# Contributing

We welcome contributions from the community to enhance the plugin's
functionality and address any issues. If you have any feedback, bug reports, or
feature requests, please don't hesitate to
[open an issue](https://github.com/scssyworks/argon-calendar-core/issues) or
submit a
[pull request](https://github.com/scssyworks/argon-calendar-core/pulls).
