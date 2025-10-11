import { Calendar, Day } from "../styles/main.js";

function CalendarBoard({
    newDate,
    setNewDate,
    monthsArray,
    daysArray,
    events,
    eventColors,
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

            if (
                currentDay === venueTime.date &&
                newDate.month === venueTime.month &&
                newDate.year === venueTime.year
            ) {
                hasEvent = true;
                return;
            }
        });

        return hasEvent;
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
                    const event = events.find(
                        (e) => new Date(e.dateVenue).getDate() === i + 1
                    );
                    const colorKey = event
                        ? event.dateVenue + event.originCompetitionName
                        : null;

                    return (
                        <Day
                            key={i}
                            hasEvent={currentDayHasEvent}
                            eventColor={
                                colorKey ? eventColors[colorKey] : "#fff"
                            }
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
