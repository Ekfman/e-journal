const express = require("express");
const router = express.Router();

const entriesRouter = require("./entries");
router.use("/entries", entriesRouter);

router.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

module.exports = router;
