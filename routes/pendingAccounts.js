const express = require('express');
const router = express.Router();
const pool = require('../database'); // connexion PostgreSQL

// GET /api/pending
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.pending_accounts ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur SQL :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des comptes en attente.' });
  }
});

module.exports = router;
