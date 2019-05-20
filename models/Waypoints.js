const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const WaypointsSchema = {
  tripId: {
    type: ObjectId,
    ref: "Trips",
    required: [true]
  },
  order: {
    type: Number,
    required: [true]
  },
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: [true]
  },
  longitude: {
    type: Number,
    required: [true]
  },
  start: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  timeComplete: {
    type: Date
  }
};

module.exports = mongoose.model("Waypoints", WaypointsSchema);
