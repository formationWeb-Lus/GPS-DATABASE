const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  vehiculeId: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  quartier: String,
  avenue: String,
  duration_seconds: Number
});

// ✅ Pas de bufferCommands ici
module.exports = mongoose.model('Stop', stopSchema);
