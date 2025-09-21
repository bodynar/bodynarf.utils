# Date Utilities

Utilities for working with dates, including formatting, validations, and other operations.

## Functions

### formatDate

Formats a date into a string according to the specified format.

```typescript
import { formatDate } from "@bodynarf/utils";

const date = new Date(2023, 5, 15, 14, 30, 45); // June 15, 2023 14:30:45
formatDate(date, "dd.MM.yyyy"); // "15.06.2023"
formatDate(date, "d.M.yyyy"); // "15.6.2023"
formatDate(date, "HH:mm:ss"); // "14:30:45"
formatDate(date, "H:m:s"); // "14:30:45"
formatDate(date, "dd.MM.yyyy HH:mm:ss"); // "15.06.2023 14:30:45"
formatDate(date, "yyyy-MM-dd"); // "2023-06-15"
```

### isWeekend

Checks if a date is a weekend day (Saturday or Sunday).

```typescript
import { isWeekend } from "@bodynarf/utils";

const saturday = new Date(2023, 5, 17); // Saturday, June 17, 2023
const monday = new Date(2023, 5, 19); // Monday, June 19, 2023

isWeekend(saturday); // true
isWeekend(monday); // false
```

### isLeapYear

Checks if a year is a leap year.

```typescript
import { isLeapYear } from "@bodynarf/utils";

isLeapYear(2020); // true
isLeapYear(2021); // false
isLeapYear(2000); // true (divisible by 400)
isLeapYear(1900); // false (divisible by 100 but not by 400)
```

### getDaysInMonth

Returns the number of days in a month for a given year.

```typescript
import { getDaysInMonth } from "@bodynarf/utils";

getDaysInMonth(2023, 1); // 28 (February 2023)
getDaysInMonth(2020, 1); // 29 (February 2020 - leap year)
getDaysInMonth(2023, 0); // 31 (January 2023)
getDaysInMonth(2023, 3); // 30 (April 2023)
```

## Date Prototype Methods

### format

Formats a date into a string according to the specified format.

```typescript
import "@bodynarf/utils/date"; // Must be imported to extend the prototype

const date = new Date(2023, 5, 15, 14, 30, 45); // June 15, 2023 14:30:45
date.format("dd.MM.yyyy"); // "15.06.2023"
date.format("d.M.yyyy"); // "15.6.2023"
date.format("HH:mm:ss"); // "14:30:45"
date.format("H:m:s"); // "14:30:45"
date.format("dd.MM.yyyy HH:mm:ss"); // "15.06.2023 14:30:45"
date.format("yyyy-MM-dd"); // "2023-06-15"
```

### isWeekend

Checks if a date is a weekend day (Saturday or Sunday).

```typescript
import "@bodynarf/utils/date"; // Must be imported to extend the prototype

const saturday = new Date(2023, 5, 17); // Saturday, June 17, 2023
const monday = new Date(2023, 5, 19); // Monday, June 19, 2023

saturday.isWeekend(); // true
monday.isWeekend(); // false
```

### isLeapYear

Checks if the year of the date is a leap year.

```typescript
import "@bodynarf/utils/date"; // Must be imported to extend the prototype

const date1 = new Date(2020, 5, 17); // June 17, 2020
const date2 = new Date(2021, 5, 17); // June 17, 2021

date1.isLeapYear(); // true
date2.isLeapYear(); // false
```

### getDaysInMonth

Returns the number of days in the month of the date.

```typescript
import "@bodynarf/utils/date"; // Must be imported to extend the prototype

const date1 = new Date(2023, 1, 15); // February 15, 2023
const date2 = new Date(2020, 1, 15); // February 15, 2020 (leap year)

date1.getDaysInMonth(); // 28
date2.getDaysInMonth(); // 29
