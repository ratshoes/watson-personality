const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const TripsSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: [true]
  },

  name: {
    type: String,
    required: true
  },
  isArchived: {
    type: Boolean,
    default: false,
    required: [true]
  },

  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  latitude: {
    type: Number,
    required: [true]
  },
  longitude: {
    type: Number,
    required: [false]
  },
  image: {
    type: String,
    required: false
  },
  inProgress: {
    type: Boolean,
    default: false
  },
  timeLimit: {
    type: Number
  },
  complete: {
    type: Boolean
  },
  isPublic: {
    type: Boolean,
    required: false
  },
  waypoints: [
    {
      type: ObjectId,
      ref: "Waypoints"
    }
  ]
});

module.exports = mongoose.model("Trips", TripsSchema);
