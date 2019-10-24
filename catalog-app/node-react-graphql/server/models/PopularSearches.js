let mongoose = require('mongoose');

let PopularSearchesSchema = new mongoose.Schema({
    Searched: String,
    Times: Number
  });

  module.exports = mongoose.model('popularSearche', PopularSearchesSchema);
