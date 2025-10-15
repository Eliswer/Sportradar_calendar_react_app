/**
 * @file server.js
 * @description Express backend server for managing sports events.
 * Provides endpoints for retrieving, creating, and deleting events stored in a local JSON file.
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Absolute path to the events data file.
 * @constant {string}
 */
const dataFile = path.join(__dirname, "data", "events.json");

/**
 * Loads the list of events from the JSON data file.
 *
 * @function
 * @returns {Array<Object>} The parsed list of events, or an empty array if the file cannot be read.
 */
function load() {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data file:", error);
        return [];
    }
}

/**
 * Saves the current list of events to the JSON data file.
 *
 * @function
 * @param {Array<Object>} list - The list of event objects to save.
 * @returns {void}
 */
function save(list) {
    fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), "utf8");
}

/**
 * In-memory cache of loaded events.
 * @type {Array<Object>}
 */
let events = load();

/**
 * GET /events
 * Returns the list of all stored events.
 *
 * @name GET /events
 * @function
 * @memberof module:server
 * @returns {Object[]} 200 - JSON array of event objects.
 */
app.get("/events", (req, res) => {
    res.json(events);
});

/**
 * POST /events
 * Creates a new event and adds it to the stored list.
 *
 * @name POST /events
 * @function
 * @memberof module:server
 * @param {Object} req.body - Event data sent from the client.
 * @returns {Object} 201 - The created event with a unique `id`.
 */
app.post("/events", (req, res) => {
    const newEvent = { id: Date.now(), ...req.body };
    events.push(newEvent);
    save(events);
    res.status(201).json(newEvent);
});

/**
 * DELETE /events/:id
 * Deletes a specific event by its ID.
 *
 * @name DELETE /events/:id
 * @function
 * @memberof module:server
 * @param {number} req.params.id - The ID of the event to delete.
 * @returns {Object} 200 - Confirmation object `{ ok: true }` after deletion.
 */
app.delete("/events/:id", (req, res) => {
    const id = Number(req.params.id);
    events = events.filter((e) => e.id !== id);
    save(events);
    res.json({ ok: true });
});

/**
 * Starts the server on port 3001.
 * Logs the active server URL to the console.
 *
 * @function
 */
app.listen(3001, () => {
    console.log("API on http://localhost:3001");
});
