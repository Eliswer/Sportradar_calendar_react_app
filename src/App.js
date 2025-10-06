import { useEffect, useState } from "react";
import { GlobalStyle, AppWrapper } from "./styles/main.js";
import CalendarBoard from "./components/CalendarBoard.jsx";
import EventsBoard from "./components/EventsBoard.jsx";

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
        fetch("/sportData.json")
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then((data) => {
                setEvents(data.data);
            });
    }, []);

    const today = new Date();
    const [newDate, setNewDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDay(),
    });

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
                <EventsBoard
                    newDate={newDate}
                    daysArray={daysArray}
                    events={events}
                    monthsArray={monthsArray}
                />
            </AppWrapper>
        </>
    );
}

export default App;
