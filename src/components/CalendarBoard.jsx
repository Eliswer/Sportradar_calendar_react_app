import { Calendar, Day } from "../styles/main.js";

function CalendarBoard({
    newDate,
    setNewDate,
    monthsArray,
    daysArray,
    events,
}) {
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

    /* 

    const venueDay = new Date(event.dateVenue).getDay();

    const hasEvent = 1;*/

    function hasEvent(currentDay) {
        let hasEvent = false;

        events.forEach((event) => {
            const date = event.dateVenue;

            const venueTime = {
                month: new Date(date).getMonth(),
                day: new Date(date).getDay(),
                date: new Date(date).getDate(),
                year: new Date(date).getFullYear(),
                time: event.timeVenueUTC.slice(0, 5),
            };

            if (currentDay === venueTime.date) {
                hasEvent = true;
                return;
            }
        });

        return hasEvent;
    }

    function randomPastelColor() {
        const r = Math.floor(Math.random() * 127 + 128);
        const g = Math.floor(Math.random() * 127 + 128);
        const b = Math.floor(Math.random() * 127 + 128);
        return `rgb(${r}, ${g}, ${b})`;
    }

    return (
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
                    return (
                        <div key={day} className="week-day">
                            {day}
                        </div>
                    );
                })}
                {Array.from({ length: adjustedFirstDayOfMonth }, (_, i) => (
                    <div key={i}></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const currentDayHasEvent = hasEvent(i + 1);
                    const eventColor = randomPastelColor();

                    return (
                        <Day
                            hasEvent={currentDayHasEvent}
                            eventColor={eventColor}
                            key={i}
                        >
                            {i + 1}
                        </Day>
                    );
                })}
            </div>
        </Calendar>
    );
}

export default CalendarBoard;
