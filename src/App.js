import { useEffect, useState } from "react";
import { GlobalStyle, AppWrapper } from "./styles/main.js";
import CalendarBoard from "./components/CalendarBoard.jsx";
import EventsBoard from "./components/EventsBoard.jsx";
import AddEventForm from "./components/AddEventForm.jsx";

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

const daysArray = ["Mo", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/events")
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

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

    const [eventColors, setEventColors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const today = new Date();
    const [newDate, setNewDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDay(),
    });

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
                        newDate={newDate}
                        monthsArray={monthsArray}
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
