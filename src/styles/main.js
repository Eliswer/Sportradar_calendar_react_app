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

const Calendar = styled.div`
    height: 50%;
    width: 50%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    justify-content: space-between;
    max-width: 550px;
    background-color: white;
    box-shadow: 0px 10px 13px -7px rgb(104, 104, 104),
        5px 5px 15px 5px rgba(0, 0, 0, 0);
    border-radius: 10px;

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        h1 {
        }

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
const EventsBoardStyled = styled.div`
    height: 50%;
    width: 50%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    justify-content: space-between;
    max-width: 550px;
    background-color: white;
    box-shadow: 0px 10px 13px -7px rgb(104, 104, 104),
        5px 5px 15px 5px rgba(0, 0, 0, 0);
    border-radius: 10px;

    .filters-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;

        p {
            &:hover {
                cursor: pointer;
                color: #0056b3;
            }
        }
    }

    .event {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }

    .event__date {
        display: flex;
        flex-direction: column;
        padding: 0;
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
    }
`;

const EventForm = styled.div`
    height: 50%;
    width: 50%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    justify-content: space-between;
    max-width: 550px;
    background-color: white;
    box-shadow: 0px 10px 13px -7px rgb(104, 104, 104),
        5px 5px 15px 5px rgba(0, 0, 0, 0);
    border-radius: 10px;

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
    margin: 10px;

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
};
