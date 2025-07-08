const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Numéro de téléphone requis' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Téléphone non trouvé' });
    }

    const user = result.rows[0];
    return res.status(200).json({ user });
  } catch (err) {
    console.error('Erreur serveur :', err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

module.exports = router;
