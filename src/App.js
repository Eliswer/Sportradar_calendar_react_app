import { useEffect, useState } from "react";
import { GlobalStyle, AppWrapper, EventsBoard } from "./styles/main.js";

import CalendarBoard from "./components/CalendarBoard.jsx";

const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    " May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("/sportData.json")
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setEvents(data);
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
                />
                <EventsBoard>
                    <h2>
                        {monthsArray[newDate.month]} {newDate.year}
                    </h2>
                </EventsBoard>
            </AppWrapper>
        </>
    );
}

export default App;
