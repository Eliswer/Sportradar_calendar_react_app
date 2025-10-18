/**
 * @file EventsBoard.jsx
 * @description Displays all events for the selected month, categorized by sport, and allows filtering or adding new events.
 */

import { useState } from "react";
import { EventsBoardStyled, Button, EventCard } from "../styles/main.js";

import { categories } from "../constants/dataArrays.js";

/**
 * Renders the list of events for the currently selected month.
 * Provides filtering by sport category and navigation back to the event form.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string[]} props.daysArray - Array of weekday abbreviations (e.g., "Mo", "Tue", "Wed", ...).
 * @param {Array<Object>} props.events - List of all event objects containing date, time, and sport information.
 * @param {string[]} props.monthsArray - Array of month names (e.g., "January", "February", ...).
 * @param {{year: number, month: number, day: number}} props.newDate - Currently selected date.
 * @param {Function} props.setIsEditing - Toggles between the event form and event board view.
 * @param {Object<string, string>} props.eventColors - Object mapping unique event identifiers to assigned pastel colors.
 * @returns {JSX.Element} A board displaying events for the current month, or a message if none exist.
 */
function EventsBoard({
    daysArray,
    events,
    monthsArray,
    newDate,
    setIsEditing,
    eventColors,
}) {
    /**
     * Currently selected category filter.
     * @type {string}
     */
    const [categorySelect, setCategorySelect] = useState("all");
    /**
     * Events filtered by the selected category.
     * @type {Array<Object> | undefined}
     */
    const [categorizedEvents, setCategorizedEvents] = useState(undefined);
    /**
     * Determines which event list to render (all events or filtered events).
     * @type {Array<Object>}
     */
    const itemsToRender = categorySelect === "all" ? events : categorizedEvents;

    /**
     * Handles switching between event categories and updates the filtered list.
     *
     * @function
     * @param {React.MouseEvent<HTMLParagraphElement>} e - The click event from the category filter.
     */
    function changeCategory(e) {
        setCategorySelect(e.target.id);

        setCategorizedEvents(
            events.filter((event) => event.sport === e.target.id)
        );
    }

    return (
        <EventsBoardStyled>
            <div>
                <h2>
                    {monthsArray[newDate.month]} {newDate.year}
                </h2>
                <div className="filters-wrapper">
                    {categories.map((category) => {
                        return (
                            <p
                                key={category.toLowerCase()}
                                id={category.toLowerCase()}
                                onClick={changeCategory}
                                className={
                                    categorySelect === category.toLowerCase()
                                        ? "active"
                                        : ""
                                }
                            >
                                {category}
                            </p>
                        );
                    })}
                </div>
            </div>

            <div className="events-scrollable-wrapper">
                {/* Display message if there are no events for the selected month */}
                {itemsToRender.filter((event) => {
                    const date = new Date(event.dateVenue);
                    return (
                        date.getMonth() === newDate.month &&
                        date.getFullYear() === newDate.year
                    );
                }).length === 0 && (
                    <p className="no-events-message">
                        No events for this month
                    </p>
                )}

                {/* Render events for the selected month */}
                {itemsToRender.map((event, i) => {
                    const date = event.dateVenue;

                    const venueTime = {
                        month: new Date(date).getMonth(),
                        day: new Date(date).getDay(),
                        date: new Date(date).getDate(),
                        year: new Date(date).getFullYear(),
                        time: event.timeVenueUTC.slice(0, 5),
                    };

                    return (
                        newDate.month === venueTime.month &&
                        newDate.year === venueTime.year && (
                            <div key={i} className="event">
                                <EventCard
                                    key={i}
                                    $event={event}
                                    $eventColors={eventColors}
                                    className="event"
                                >
                                    <div className="event__date">
                                        <p className="event__day-number">
                                            {venueTime.date}
                                        </p>
                                        <p className="event__day-name">
                                            {daysArray[venueTime.day]}
                                        </p>
                                    </div>
                                </EventCard>

                                <div className="event__competition">
                                    {event.originCompetitionName}
                                    {" - " + venueTime.time}
                                </div>
                            </div>
                        )
                    );
                })}
            </div>

            <Button onClick={() => setIsEditing((prev) => !prev)}>
                Add event
            </Button>
        </EventsBoardStyled>
    );
}

export default EventsBoard;
