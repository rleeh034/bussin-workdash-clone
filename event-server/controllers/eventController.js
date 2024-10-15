const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "90d" });
};

// get all events
const getEvents = async (req, res) => {
  const user_id = req.query.id;
  const events = await Event.find({ user_id }).sort({ start: 1 });

  res.status(200).json(events);
};

// create new event
const createEvent = async (req, res) => {
  const { name, start, end, user_id } = req.body;

  // add to db
  try {
    const event = await Event.create({ name, start, end, user_id });

    // create a token
    const token = createToken(event._id);

    res.status(200).json({event, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete event
const deleteEvent = async (req, res) => {
  const event_id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(event_id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndDelete({ _id: event_id });

  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

// update a product
const updateEvent = async (req, res) => {
  const event_id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(event_id)) {
    return res.status(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndUpdate(
    { _id: event_id },
    {
      ...req.body,
    }
  );

  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }

  res.status(200).json(event);
};

const testEvent = async (req, res) => {
  res.status(200).json({ message: 'Test event-server' });
};


module.exports = {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  testEvent
};
