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
                <EventsBoard>
                    <h2>
                        {monthsArray[newDate.month]} {newDate.year}
                    </h2>
                    {events.map((event) => {
                        const date = event.dateVenue;
                        const venueMonth = new Date(date).getMonth();
                        const venueDay = new Date(date).getMonth();

                        console.log(event);

                        return (
                            <div>
                                <div className="date-title">
                                    <h2>20 {monthsArray[newDate.month]}</h2>
                                </div>
                                <div>
                                    {newDate.month === venueMonth
                                        ? event.dateVenue
                                        : null}
                                </div>
                            </div>
                        );
                    })}
                </EventsBoard>
            </AppWrapper>
        </>
    );
}

export default App;
