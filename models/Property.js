const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const PropertySchema = Schema(
  {
    createdBy: {
      type: ObjectId,
      ref: "User",
      required:true,
      autopopulate: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    active: {
      type: Boolean,
      default: true
    },
 
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    cleaningFee: {
      type: Number,
      required: true
    },
    occupants: {
      type: Number,
      required: true
    },
    image: String,
    required: false
  },

  { timestamps: true }
);

PropertySchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Property", PropertySchema);
