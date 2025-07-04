const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  vehiculeId: String,
  latitude: Number,
  longitude: Number,
  vitesse: Number,
  timestamp: Date
});

// ✅ Pas de bufferCommands ici
module.exports = mongoose.model('Position', positionSchema);
