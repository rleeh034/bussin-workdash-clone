const Event = require("../models/eventModel");

async function validateEvent(req, res, next) {
    const { name, start, end, user_id } = req.body;
    const event_id = req.params.id
    const dateTimeNow = new Date()
    let emptyFields = [];
  
    // check if fields are all valid
    if (!name) {
      emptyFields.push("name");
    }
    if (!start) {
      emptyFields.push("start");
    }
    if (!end) {
      emptyFields.push("end");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all the fields", emptyFields });
    } 
    // if fields are valid, 
    // check if it is a valid time range
    if (start >= end ) {
      return res
        .status(400)
        .json({ error: "Start time cannot be after end time" });
    }
    // check if user is creating a past event
    if (new Date(start) < dateTimeNow || new Date(end) < dateTimeNow) {
      return res
      .status(400)
      .json({ error: "Cannot create a past event" });
    }

    // check if there are any overlaps
    const overlap = await Event.find({
      _id: { $ne: event_id },
      user_id: user_id,
      $or: [
          { start: { $lt: end }, end: { $gt: start } },
          { start: { $gte: start, $lte: end } },
      ]
    });

    if (overlap.length > 0) {
      return res
      .status(400)
      .json({ error: "Overlapping event exists" });
    }
  
    // continue if all validation passed
    next();
  }

module.exports = validateEvent;