const express = require('express');
const router = express.Router();
const pool = require('../database'); // adapte le chemin si besoin

// Route POST /api/auth/register
router.post('/register', async (req, res) => {
  const { firstname, lastname, phone, plan, vehicleCount } = req.body;

  if (!firstname || !lastname || !phone) {
    return res.status(400).json({ error: true, message: 'Champs manquants' });
  }

  try {
    const query = `
      INSERT INTO pending_accounts (firstname, lastname, phone, plan, vehicle_count)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, firstname, lastname, phone, plan, vehicle_count, created_at
    `;
    const values = [firstname, lastname, phone, plan || null, vehicleCount || null];

    const result = await pool.query(query, values);

    res.status(201).json({ 
      error: false,
      message: 'Inscription réussie',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Erreur DB register:', err);
    res.status(500).json({ error: true, message: 'Erreur serveur' });
  }
});

module.exports = router;
