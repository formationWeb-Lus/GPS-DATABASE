const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const historiqueRoutes = require('../backend/routes/historique');
const positionRoutes = require('../backend/routes/positions-route');
const vehicleRoutes = require('../gps-device-server/routes/vehicle'); // Ajout route véhicule

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/historique', historiqueRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/vehicles', vehicleRoutes);  // Nouveau routeur véhicules

// Swagger route (très important)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connexion MongoDB puis lancement serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connexion MongoDB réussie');
    app.listen(port, () => {
      console.log(`✅ API REST en écoute sur https://backend-ojdz.onrender.com/:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur MongoDB:', err);
  });
