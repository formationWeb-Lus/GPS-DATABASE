// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Exemple simple d'endpoint POST /api/auth/login
router.post('/login', (req, res) => {
  const { phone, name } = req.body;

  // Ici tu ferais la vérification dans ta base de données PostgreSQL
  // Pour l'exemple on répond juste OK si les infos sont présentes
  if (!phone || !name) {
    return res.status(400).json({ error: 'Nom et téléphone requis' });
  }

  // TODO: Vérifier dans la base que l'utilisateur existe, mot de passe, etc.

  res.json({ message: 'Connexion réussie', user: { phone, name } });
});

// Exemple simple d'endpoint POST /api/auth/register
router.post('/register', (req, res) => {
  const { firstName, lastName, phone } = req.body;

  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // TODO: Enregistrer l'utilisateur dans la base PostgreSQL

  res.json({ message: 'Inscription réussie', user: { firstName, lastName, phone } });
});

module.exports = router;
