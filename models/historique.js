const mongoose = require('mongoose');

const historiqueSchema = new mongoose.Schema({
  vehicule: String,
  date: String,
  distance_km: Number,
  start_time: String,
  end_time: String,
  total_stops: Number,
  total_stop_time: String,
  positions: Array
});

// ✅ Pas de bufferCommands ici
module.exports = mongoose.model('Historique', historiqueSchema);
