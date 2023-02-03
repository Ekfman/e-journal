const express = require("express");
const { addEntry } = require("../db/models/entries");
const entriesRouter = express.Router();

entriesRouter.post("/", async (req, res, next) => {
    try {
        const { createDate, eventDate, title, description, content } = req.body;
        const newEntry = await addEntry (createDate, eventDate, title, description, content)
        console.log('newEntry :>> ', newEntry);
        res.send(newEntry)
    } catch ({ name, message }) {
        next({ name, message })
    }
})

module.exports = entriesRouter;