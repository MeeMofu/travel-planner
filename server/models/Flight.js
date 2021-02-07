const mongoose = require('mongoose');

const { Schema } = mongoose;

const flightSchema = new Schema({
  airline: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    require: true
  },
  return: {
    type: String
  },
  stops: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },

});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
