import { useState } from "react";
import { Button, EventForm } from "../styles/main.js";

function AddEventForm({ newDate, monthsArray, setIsEditing, setEvents }) {
    const [formData, setFormData] = useState({
        originCompetitionName: "",
        dateVenue: "",
        timeVenueUTC: "",
        sport: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    console.log(formData);

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
                    <div className="form-event-wrapper">
                        <label for="originCompetitionName">
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
                        <label for="dateVenue">Day of Event</label>
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
                        <label for="timeVenueUTC">Time of Event</label>
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
                        <label for="sport">Sport</label>
                        <select
                            id="sport"
                            name="sport"
                            value={formData.sport}
                            onChange={handleChange}
                        >
                            <option>Click here to choose</option>
                            <option value="football">Football</option>
                            <option value="hockey">Hockey</option>
                            <option value="basketball">Basketball</option>
                            <option value="baseball">Baseball</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="buttons-wrapper">
                <Button onClick={() => setIsEditing((prev) => !prev)}>
                    Back to all Events
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                    Add Event
                </Button>
            </div>
        </EventForm>
    );
}

export default AddEventForm;
