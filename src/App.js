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

    const [isEditing, setIsEditing] = useState(false);

    const today = new Date();
    const [newDate, setNewDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDay(),
    });

    console.log(events);

    return (
        <>
            <GlobalStyle />
            <AppWrapper>
                <CalendarBoard
                    newDate={newDate}
                    setNewDate={setNewDate}
                    monthsArray={monthsArray}
                    daysArray={daysArray}
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
                    />
                )}
            </AppWrapper>
        </>
    );
}

export default App;
