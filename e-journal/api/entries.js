const express = require("express");
const { addEntry, getAllEntries, getEntryById } = require("../db/models/entries");
const entriesRouter = express.Router();

entriesRouter.get("/", async (req, res, next) => {
    try {
        const fetchAllEntries = await getAllEntries();
        res.send(fetchAllEntries);
    } catch ({ name, message }) {
        next({ name, message })
    }
}
);

entriesRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const fetchEntryById = await getEntryById(id);
        res.send(fetchEntryById)
    } catch ({ name, message }) {
        next({ name, message })
    }
})


entriesRouter.post("/create", async (req, res, next) => {
    try {
        const { createDate, eventDate, title, content } = req.body;
        const newEntry = await addEntry (createDate, eventDate, title, content)
        res.send(newEntry)
    } catch ({ name, message }) {
        next({ name, message })
    }
});

module.exports = entriesRouter;