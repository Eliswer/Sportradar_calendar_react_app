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
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    max-width: 500px;
    background-color: white;
    box-shadow: 0px 10px 13px -7px rgb(104, 104, 104),
        5px 5px 15px 5px rgba(0, 0, 0, 0);

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
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1 1 350px;
    justify-content: space-between;
    max-width: 500px;
    background-color: white;
    box-shadow: 0px 10px 13px -7px rgb(104, 104, 104),
        5px 5px 15px 5px rgba(0, 0, 0, 0);

    .filters-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;

        p {
            &:hover {
                cursor: pointer;
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

export { GlobalStyle, AppWrapper, Calendar, EventsBoardStyled };
