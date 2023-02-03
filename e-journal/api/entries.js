const express = require("express");
const { addEntry, getAllEntries } = require("../db/models/entries");
const entriesRouter = express.Router();

entriesRouter.get("/", async (req, res, next) => {
    try {
        const fetchAllEntries = await getAllEntries();
        res.send(fetchAllEntries);
    } catch ({ name, message }) {
        next({ name, message })
    }
}
)
entriesRouter.post("/", async (req, res, next) => {
    try {
        const { createDate, eventDate, title, description, content } = req.body;
        console.log('req.body :>> ', req.body);
        const newEntry = await addEntry (createDate, eventDate, title, description, content)
        console.log('newEntry :>> ', newEntry);
        res.send(newEntry)
    } catch ({ name, message }) {
        next({ name, message })
    }
})

module.exports = entriesRouter;