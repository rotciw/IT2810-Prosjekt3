var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    varenummer: String,
    varenavn: String,
    volum: String,
    pris: String,
    literpris: String,
    varetype: String,
    produktutvalg: String,
    fylde: String,
    friskhet: String,
    garvestoffer: String,
    bitterhet: String,
    sodme: String,
    farge: String,
    lukt: String,
    smak: String,
    land: String,
    argang: String,
  });
  
  module.exports = mongoose.model('Book', ProductSchema);