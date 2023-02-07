const express = require("express");
const { addEntry, getAllEntries, getEntryById, updateEntry, deleteEntry } = require("../db/models/entries");
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

entriesRouter.patch("/:id", async (req, res, next) => {
    const { id } = req.params;
    console.log('id :>> ', id);
    const {  eventDate, title, content } = req.body;
    console.log('req.body :>> ', req.body);
    try {
        const update = await updateEntry ( {id, eventDate, title, content})
        console.log('update :>> ', update);
        res.send(update)
    } catch ({ name, message }) {
        next({ name, message })
    }
})

entriesRouter.delete("/:id", async (req, res, next)=> {
    const { id } = req.params;
    try {
        const deletedEntry = await deleteEntry(id)
        res.send(deletedEntry)
    } catch ({ name, message }) {
        next({ name, message });
    }
})

module.exports = entriesRouter;