const express = require('express');
const router = express.Router();
const pool = require('../database'); // fichier qui contient la connexion PostgreSQL

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.users ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur SQL :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs.' });
  }
});

module.exports = router;
