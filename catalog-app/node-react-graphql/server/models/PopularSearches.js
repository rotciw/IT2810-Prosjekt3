var mongoose = require('mongoose');

var PopularSearchesSchema = new mongoose.Schema({
    Searched: String,
    Times: Number
  });

  module.exports = mongoose.model('popularSearche', PopularSearchesSchema);
