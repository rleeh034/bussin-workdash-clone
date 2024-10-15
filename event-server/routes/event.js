const express = require("express");
const validateEvent = require("../middleware/validateEvent");

// controller functions
const {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent,
    testEvent
  } = require("../controllers/eventController");

const router = express.Router();

// GET all events
router.get("/", getEvents);

// POST a new event
router.post("", validateEvent, createEvent);

// DELETE a event
router.delete("/:id", deleteEvent);

// UPDATE a event
router.patch("/:id", validateEvent, updateEvent);

// UPDATE a event
router.get("/test", testEvent);

module.exports = router;