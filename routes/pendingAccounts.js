const express = require('express');
const router = express.Router();
const pool = require('../database'); // pool PostgreSQL

router.post('/', async (req, res) => {
  const { firstname, lastname, phone, plan, vehicleCount } = req.body;

  if (!firstname || !lastname || !phone || !plan || !vehicleCount) {
    return res.status(400).json({ message: 'Champs obligatoires manquants' });
  }

  try {
    const query = `
      INSERT INTO pending_accounts (firstname, lastname, phone, plan, vehicle_count)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [firstname, lastname, phone, plan, vehicleCount];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Compte en attente enregistré', user: result.rows[0] });
  } catch (error) {
    console.error('Erreur PostgreSQL:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
