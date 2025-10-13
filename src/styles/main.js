import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Archivo", sans-serif;
    background-color: #e8e8e8;
  }

  h1, h2, h3 {
    margin: 0;
    font-weight: 600;
    color: #1f1f1f;
  }

  p {
    margin: 0;
  }
`;

const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    max-width: 100%;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
`;

const BaseCard = styled.div`
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    height: 50%;
    width: 50%;
    max-width: 550px;
`;

const Calendar = styled(BaseCard)`
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    justify-content: space-between;

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        img {
            height: 2.5rem;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .calendar-days-render {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        place-items: center;
        height: 100%;

        .week-day {
            font-weight: bold;
        }
    }
`;
const Day = styled.div`
    background-color: ${({ $hasEvent, $eventColor }) =>
        $hasEvent ? $eventColor : "#fff"};
    color: ${({ $hasEvent }) => ($hasEvent ? "#fff" : "#333")};
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    transition: all 0.25s ease;
    box-shadow: ${({ hasEvent }) =>
        hasEvent ? "0 0 6px rgba(0,0,0,0.2)" : "none"};

    &:hover {
        transform: scale(1.05);
        background-color: ${({ $hasEvent, $eventColor }) =>
            $hasEvent ? $eventColor : "#eef3ff"};
        color: ${({ $hasEvent }) => ($hasEvent ? "#fff" : "#0077ff")};
        cursor: pointer;
    }

    @media (max-width: 600px) {
        width: 34px;
        height: 34px;
        font-size: 0.9rem;
    }
`;

const EventsBoardStyled = styled(BaseCard)`
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    justify-content: space-between;

    h2 {
        margin-bottom: 10px;
    }

    .filters-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 20px;

        p {
            &:hover {
                cursor: pointer;
                color: #0056b3;
                transition: color 0.2s ease, transform 0.15s ease;

                &:hover {
                    cursor: pointer;
                    color: #007bff;
                    transform: translateY(-2px);
                }
            }
        }
    }

    .event {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        border-bottom: 1px solid #eee;
    }

    .event__day-number,
    .event__day-name {
        margin: 0;
    }

    .event__day-name {
        color: grey;
        font-weight: 100;
    }

    .event__details {
        flex: 1;
        text-align: center;
    }

    .event__competition {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 85%;
        text-align: center;
        font-size: 0.95rem;
        color: #333;
    }
    .no-events-message {
        text-align: center;
        font-size: 1.1rem;
        font-weight: 500;
        color: #555;
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 20px;
        margin: 20px auto;
        width: 80%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        animation: fadeIn 0.4s ease-in;

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;

const EventCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    width: 3.5rem;
    border-radius: 5px;
    background-color: ${({ $event, $eventColors }) =>
        $eventColors[$event.dateVenue + $event.originCompetitionName] ||
        "#fff"};
`;

const EventForm = styled(BaseCard)`
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    justify-content: space-between;

    h2 {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #333;
    }

    .form-wrapper {
        height: 70%;

        form {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .form-event-wrapper {
                display: flex;
                flex-direction: column;
                gap: 4px;

                label {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                }

                input {
                    margin-bottom: 5px;
                }

                input,
                select {
                    font-size: 1rem;
                    padding: 10px 12px;
                    border: 1.5px solid #ccc;
                    border-radius: 6px;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;

                    &:focus {
                        border-color: #0077ff;
                        box-shadow: 0 0 4px rgba(0, 119, 255, 0.4);
                    }
                }

                select {
                    background-color: #fff;
                    cursor: pointer;
                }
            }
        }
    }

    .buttons-wrapper {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        flex-wrap: wrap;
    }
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.25s ease, transform 0.1s ease;
    margin: 12px;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        background-color: #004494;
    }
`;

export {
    GlobalStyle,
    AppWrapper,
    Calendar,
    EventsBoardStyled,
    EventForm,
    Button,
    Day,
    EventCard,
};
