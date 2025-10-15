/**
 * @file CalendarBoard.jsx
 * @description Displays the interactive monthly calendar view, showing all days in the current month and highlighting those with scheduled events.
 */

import { Calendar, Day } from "../styles/main.js";

/**
 * Renders the main calendar view where users can browse through months and visually identify dates with events.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {{year: number, month: number, day: number}} props.newDate - The currently displayed date (year, month, day).
 * @param {Function} props.setNewDate - Setter function to update the currently displayed date.
 * @param {string[]} props.monthsArray - Array of month names (e.g., "January", "February", ...).
 * @param {string[]} props.daysArray - Array of weekday abbreviations (e.g., "Mo", "Tue", "Wed", ...).
 * @param {Array<Object>} props.events - List of all events with date and time information.
 * @param {Object<string, string>} props.eventColors - Object mapping unique event identifiers to their assigned colors.
 * @returns {JSX.Element} The rendered calendar view with navigable months and highlighted event days.
 */
function CalendarBoard({
    newDate,
    setNewDate,
    monthsArray,
    daysArray,
    events,
    eventColors,
}) {
    /**
     * Changes the currently displayed month based on the provided offset.
     * Handles month rollover (December → January, January → December).
     *
     * @function
     * @param {number} offset - The change in months (e.g., -1 for previous month, +1 for next month).
     */
    function changeMonth(offset) {
        setNewDate((prev) => {
            if (prev.month === 11 && offset === 1) {
                return {
                    ...prev,
                    month: 0,
                    year: prev.year + 1,
                };
            } else if (prev.month === 0 && offset === -1) {
                return {
                    ...prev,
                    month: 11,
                    year: prev.year - 1,
                };
            } else {
                return {
                    ...prev,
                    month: prev.month + offset,
                };
            }
        });
    }

    /** Total number of days in the currently selected month. */
    const daysInMonth = new Date(newDate.year, newDate.month + 1, 0).getDate();

    /** Day index (0–6) of the first day in the current month, adjusted so Monday = 0. */
    const firstDayInMonth = new Date(newDate.year, newDate.month, 1).getDay();
    const adjustedFirstDayOfMonth =
        firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;

    /**
     * Determines whether a specific calendar day has an event.
     *
     * @function
     * @param {number} currentDay - The day number (1–31) to check.
     * @returns {boolean} True if an event exists on that day; otherwise false.
     */
    function hasEvent(currentDay) {
        let hasEvent = false;

        events.forEach((event) => {
            const date = event.dateVenue;

            const venueTime = {
                month: new Date(date).getMonth(),
                day: new Date(date).getDay(),
                date: new Date(date).getDate(),
                year: new Date(date).getFullYear(),
                time: event.timeVenueUTC.slice(0, 5),
            };

            if (
                currentDay === venueTime.date &&
                newDate.month === venueTime.month &&
                newDate.year === venueTime.year
            ) {
                hasEvent = true;
                return;
            }
        });

        return hasEvent;
    }

    return (
        <Calendar>
            <div className="title">
                <img
                    alt="left-arrow"
                    src="/icons/thin-arrow-direction-left-svgrepo-com.svg"
                    onClick={() => {
                        changeMonth(-1);
                    }}
                />
                <h1>
                    {monthsArray[newDate.month]} {newDate.year}
                </h1>
                <img
                    alt="right-arrow"
                    src="/icons/thin-arrow-direction-right-svgrepo-com.svg"
                    onClick={() => {
                        changeMonth(1);
                    }}
                />
            </div>
            <div className="calendar-days-render">
                {/* Render weekday headers */}
                {daysArray.map((day) => {
                    return (
                        <div key={day} className="week-day">
                            {day}
                        </div>
                    );
                })}
                {/* Render leading empty slots before the first day */}
                {Array.from({ length: adjustedFirstDayOfMonth }, (_, i) => (
                    <div key={i}></div>
                ))}
                {/* Render actual calendar days */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const currentDayHasEvent = hasEvent(i + 1);
                    const event = events.find(
                        (e) => new Date(e.dateVenue).getDate() === i + 1
                    );
                    const colorKey = event
                        ? event.dateVenue + event.originCompetitionName
                        : null;

                    return (
                        <Day
                            key={i}
                            $hasEvent={currentDayHasEvent}
                            $eventColor={
                                colorKey ? eventColors[colorKey] : "#fff"
                            }
                        >
                            {i + 1}
                        </Day>
                    );
                })}
            </div>
        </Calendar>
    );
}

export default CalendarBoard;
