const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, "data", "events.json");

function load() {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data file:", error);
        return [];
    }
}

function save(list) {
    fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), "utf8");
}

let events = load();

app.get("/events", (req, res) => {
    res.json(events);
});

app.post("/events", (req, res) => {
    const newEvent = { id: Date.now(), ...req.body };
    events.push(newEvent);
    save(events);
    res.status(201).json(newEvent);
});

app.delete("/events/:id", (req, res) => {
    const id = Number(req.params.id);
    events = events.filter((e) => e.id !== id);
    save(events);
    res.json({ ok: true });
});

app.listen(3001, () => {
    console.log("API on http://localhost:3001");
});
