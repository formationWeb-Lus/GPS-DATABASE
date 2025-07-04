// routes/test.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connexion PostgreSQL OK ✅', now: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Connexion PostgreSQL échouée ❌', details: err.message });
  }
});

module.exports = router;
