# React Sportradar Calendar App

A full-stack calendar application built with **React** and **Node.js (Express)** that displays and manages sporting events in an interactive monthly view.  
This project demonstrates component-based architecture, REST API integration, styled-components for responsive design, and clean documentation using JSDoc.

---

## Features

-   Interactive and responsive calendar UI built with React
-   Add, view, and filter sporting events by category
-   Persistent event data stored and served via a Node.js + Express backend
-   Random pastel color generation for visual differentiation of events
-   Styled with **styled-components** for professional, adaptive design
-   Comprehensive JSDoc documentation for frontend and backend
-   Modular file structure for scalability and maintainability

---

## Prerequisites

Before running this project, make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 16 or higher)
-   npm (comes with Node.js)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Eliswer/react-sportradar-calendar.git
```

### 2. Navigate to the project directory

```bash
cd react-sportradar-calendar
```

### 3. Install dependencies

```bash
npm install
```

### 4. Navigate to the backend folder and install backend dependencies

```bash
cd backend
npm install
```

## Installation

### Start the Backend (Express Server)

```bash
npx nodemon server.js
```

This will run the backend on http://localhost:3001

### Start the React Frontend

From the project root directory, run:

```bash
npm start
```

This will launch the React app on http://localhost:3000
and automatically connect to the backend API.

## Project structure

react-sportradar-calendar/
├── backend/
│ ├── data/
│ │ └── events.json
│ └── server.js
├── src/
│ ├── components/
│ │ ├── AddEventForm.jsx
│ │ ├── CalendarBoard.jsx
│ │ └── EventsBoard.jsx
│ ├── constants/
│ │ └── dateArrays.js
│ ├── styles/
│ │ └── main.js
│ ├── App.js
│ └── index.js
├── package.json
└── README.md

## Usage

1. The main calendar displays all events for the selected month
2. Days with events are highlighted in unique pastel colors
3. The sidebar displays a categorized event list
4. Click Add Event to open the event form and create a new event
5. Newly created events are stored in the backend and persist across reloads
6. Use category filters (Football, Hockey, Basketball, Baseball) to view specific sports

## Usage

### Frontend

-   React (Hooks)
-   styled-components
-   JavaScript (ES6+)
-   Fetch API

### Backend

-   Node.js + Express.js
-   CORS
-   File-based JSON storage
-   nodemon

### Documentation

-   JSDoc comments across all frontend components and backend funtions

## Development

The project uses:

React Scripts for frontend development nodemon for backend live reload styled-components for responsive UI and reusable styling

Frontend URL: http://localhost:3000
Backend API: http://localhost:3001/events

## License

This project is licensed under the ISC License.

## Author

Eliswer - [GitHub Profile](https://github.com/Eliswer)
