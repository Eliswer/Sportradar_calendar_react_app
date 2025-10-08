import { useState } from "react";
import { EventsBoardStyled, Button } from "../styles/main.js";

function EventsBoard({
    daysArray,
    events,
    monthsArray,
    newDate,
    setIsEditing,
}) {
    const [categorySelect, setCategorySelect] = useState("all");
    const [categorizedEvents, setCategorizedEvents] = useState(undefined);
    const itemsToRender = categorySelect === "all" ? events : categorizedEvents;

    const categories = ["All", "Football", "Hockey", "Basketball", "Baseball"];

    function changeCategory(e) {
        setCategorySelect(e.target.id);

        setCategorizedEvents(
            events.filter((event) => event.sport === e.target.id)
        );
    }

    return (
        <EventsBoardStyled>
            <div>
                <h2>
                    {monthsArray[newDate.month]} {newDate.year}
                </h2>
                <div className="filters-wrapper">
                    {categories.map((category) => {
                        return (
                            <p
                                key={category.toLowerCase()}
                                id={category.toLowerCase()}
                                onClick={changeCategory}
                            >
                                {category}
                            </p>
                        );
                    })}
                </div>
            </div>

            {itemsToRender.map((event, i) => {
                const date = event.dateVenue;

                const venueTime = {
                    month: new Date(date).getMonth(),
                    day: new Date(date).getDay(),
                    date: new Date(date).getDate(),
                    year: new Date(date).getFullYear(),
                    time: event.timeVenueUTC.slice(0, 5),
                };

                return (
                    newDate.month === venueTime.month &&
                    newDate.year === venueTime.year && (
                        <div key={i} className="event">
                            <div className="event__date">
                                <p className="event__day-number">
                                    {venueTime.date}
                                </p>
                                <p className="event__day-name">
                                    {daysArray[venueTime.day]}
                                </p>
                            </div>

                            <div className="event__competition">
                                {event.originCompetitionName}
                                {" - " + venueTime.time}
                            </div>
                        </div>
                    )
                );
            })}
            <Button onClick={() => setIsEditing((prev) => !prev)}>
                Add event
            </Button>
        </EventsBoardStyled>
    );
}

export default EventsBoard;
