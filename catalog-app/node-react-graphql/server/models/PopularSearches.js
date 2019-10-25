let mongoose = require('mongoose');

// Mongoose schema for popularSearches
let PopularSearchesSchema = new mongoose.Schema({
    Searched: String,
    Times: Number
  });

  module.exports = mongoose.model('popularSearche', PopularSearchesSchema);
