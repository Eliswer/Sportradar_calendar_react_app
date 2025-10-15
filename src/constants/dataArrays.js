/**
 * @file dateArrays.js
 * @description Contains static arrays for month and weekday names used throughout the calendar.
 */

/**
 * Full month names from January to December.
 * @type {string[]}
 */
const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

/**
 * Abbreviated day names for the calendar header.
 * @type {string[]}
 */
const daysArray = ["Mo", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Available category filters displayed above the event list. */
const categories = ["All", "Football", "Hockey", "Basketball", "Baseball"];

export { daysArray, monthsArray, categories };
