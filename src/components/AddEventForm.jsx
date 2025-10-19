/**
 * @file AddEventForm.jsx
 * @description A controlled form component for creating and submitting new sports events to the backend.
 * Handles form input changes, formatting, and posting data to the server, updating state on success.
 */

import { useState } from "react";
import { Button, EventForm } from "../styles/main.js";

/**
 * Renders the form used to add a new event.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.setIsEditing - Toggles between the form and the event list view.
 * @param {Function} props.setEvents - Updates the events state with the newly added event.
 * @returns {JSX.Element} A form that allows the user to input and submit new event data.
 */
function AddEventForm({ setIsEditing, setEvents }) {
    /**
     * Stores all user-inputted form data for the new event.
     * @type {{originCompetitionName: string, dateVenue: string, timeVenueUTC: string, sport: string}}
     */
    const [formData, setFormData] = useState({
        originCompetitionName: "",
        dateVenue: "",
        timeVenueUTC: "",
        sport: "",
    });

    /**
     * Handles changes in form input fields and updates local state.
     *
     * @function
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The input or select change event.
     */
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    /**
     * Submits the form data to the backend API.
     * Formats the time string to ensure seconds (`:00`) are included when necessary.
     * On success, updates the parent component's event list and switches back to the event board view.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>} e - The form submission event.
     */
    async function handleSubmit(e) {
        e.preventDefault();

        const formattedData = {
            ...formData,
            timeVenueUTC:
                formData.timeVenueUTC.length === 5
                    ? `${formData.timeVenueUTC}:00`
                    : formData.timeVenueUTC,
        };

        const response = await fetch("http://localhost:3001/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
        });

        if (response.ok) {
            const newEvent = await response.json();
            setEvents((prev) => [...prev, newEvent]);
            setIsEditing(false);
        }
    }

    return (
        <EventForm>
            <div className="header-wrapper">
                <h2>Add an event</h2>
            </div>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-fields-wrapper">
                        <div className="form-event-wrapper">
                            <label htmlFor="originCompetitionName">
                                Competition Name
                            </label>
                            <input
                                id="originCompetitionName"
                                name="originCompetitionName"
                                value={formData.originCompetitionName}
                                onChange={handleChange}
                                required
                            ></input>
                        </div>
                        <div className="form-event-wrapper">
                            <label htmlFor="dateVenue">Day of Event</label>
                            <input
                                id="dateVenue"
                                name="dateVenue"
                                type="date"
                                value={formData.dateVenue}
                                onChange={handleChange}
                                required
                            ></input>
                        </div>
                        <div className="form-event-wrapper">
                            <label htmlFor="timeVenueUTC">Time of Event</label>
                            <input
                                id="timeVenueUTC"
                                name="timeVenueUTC"
                                type="time"
                                value={formData.timeVenueUTC}
                                onChange={handleChange}
                                required
                            ></input>
                        </div>
                        <div className="form-event-wrapper">
                            <label htmlFor="sport">Sport</label>
                            <select
                                id="sport"
                                name="sport"
                                value={formData.sport}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Click here to choose</option>
                                <option value="football">Football</option>
                                <option value="hockey">Hockey</option>
                                <option value="basketball">Basketball</option>
                                <option value="baseball">Baseball</option>
                            </select>
                        </div>
                    </div>
                    <div className="buttons-wrapper">
                        <Button
                            type="button"
                            onClick={() => setIsEditing((prev) => !prev)}
                        >
                            Back to all Events
                        </Button>
                        <Button type="submit">Add Event</Button>
                    </div>
                </form>
            </div>
        </EventForm>
    );
}

export default AddEventForm;
