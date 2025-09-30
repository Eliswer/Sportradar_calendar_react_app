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
const EventsBoard = styled.div`
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
`;

export { GlobalStyle, AppWrapper, Calendar, EventsBoard };
