import { useState } from "react";

import {
    GlobalStyle,
    AppWrapper,
    Calendar,
    EventsBoard,
} from "./styles/main.js";

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
    const today = new Date();

    const [newDate, setNewDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDay(),
    });

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

    const daysInMonth = new Date(newDate.year, newDate.month + 1, 0).getDate();

    const firstDayInMonth = new Date(newDate.year, newDate.month, 1).getDay();
    const adjustedFirstDayOfMonth =
        firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;

    console.log(adjustedFirstDayOfMonth);

    return (
        <>
            <GlobalStyle />
            <AppWrapper>
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
                        {daysArray.map((day) => {
                            return <div className="week-day">{day}</div>;
                        })}
                        {Array.from(
                            { length: adjustedFirstDayOfMonth },
                            (_, i) => (
                                <div></div>
                            )
                        )}
                        {Array.from({ length: daysInMonth }, (_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                </Calendar>
                <EventsBoard></EventsBoard>
            </AppWrapper>
        </>
    );
}

export default App;
