/**
 * @file App.jsx
 * @description Main application component for the Sports Calendar App.
 * Handles data fetching from the backend, event color generation, and conditional rendering of calendar,
 * event list, and form components.
 */

import { useEffect, useState } from "react";
import { GlobalStyle, AppWrapper } from "./styles/main.js";
import CalendarBoard from "./components/CalendarBoard.jsx";
import EventsBoard from "./components/EventsBoard.jsx";
import AddEventForm from "./components/AddEventForm.jsx";

import { monthsArray, daysArray } from "./constants/dataArrays.js";

/**
 * Main React component for the calendar app.
 *
 * @component
 * @returns {JSX.Element} The rendered calendar application.
 */
function App() {
    /**
     * List of all events fetched from the backend.
     * @type {Array<Object>}
     */
    const [events, setEvents] = useState([]);

    /**
     * Fetches events from the backend API and stores them in state.
     * Runs once when the component mounts.
     *
     * @async
     * @function
     * @throws {Error} If the fetch request fails or response is invalid.
     */
    useEffect(() => {
        fetch("http://localhost:3001/events")
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    /**
     * Assigns a unique random pastel color to each event for consistent color-coding across the app.
     * Runs whenever the `events` state changes.
     */
    useEffect(() => {
        if (events.length > 0) {
            setEventColors((prev) => {
                const updated = { ...prev };
                events.forEach((event) => {
                    const key = event.dateVenue + event.originCompetitionName;
                    if (!updated[key]) {
                        updated[key] = randomPastelColor();
                    }
                });
                return updated;
            });
        }
    }, [events]);

    /**
     * Object mapping event identifiers to color codes for visual distinction.
     * @type {Object<string, string>}
     */
    const [eventColors, setEventColors] = useState({});

    /**
     * Boolean state for toggling between the event form and events board.
     * @type {boolean}
     */
    const [isEditing, setIsEditing] = useState(false);

    /**
     * Represents the currently selected date.
     * @type {{year: number, month: number, day: number}}
     */
    const today = new Date();
    const [newDate, setNewDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDay(),
    });

    /**
     * Generates a random pastel RGB color.
     * Used for visually distinguishing events in the calendar and event list.
     *
     * * @function
     * @returns {string} A CSS-valid RGB color string in pastel range.
     */
    function randomPastelColor() {
        const r = Math.floor(Math.random() * 127 + 128);
        const g = Math.floor(Math.random() * 127 + 128);
        const b = Math.floor(Math.random() * 127 + 128);
        return `rgb(${r}, ${g}, ${b})`;
    }

    return (
        <>
            <GlobalStyle />
            <AppWrapper>
                <CalendarBoard
                    newDate={newDate}
                    setNewDate={setNewDate}
                    monthsArray={monthsArray}
                    daysArray={daysArray}
                    events={events}
                    eventColors={eventColors}
                />
                {isEditing ? (
                    <AddEventForm
                        setIsEditing={setIsEditing}
                        setEvents={setEvents}
                    />
                ) : (
                    <EventsBoard
                        newDate={newDate}
                        daysArray={daysArray}
                        events={events}
                        monthsArray={monthsArray}
                        setIsEditing={setIsEditing}
                        eventColors={eventColors}
                    />
                )}
            </AppWrapper>
        </>
    );
}

export default App;
