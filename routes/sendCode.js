const express = require('express');
const router = express.Router();
const pool = require('../database');

// Fonction fictive pour simuler l'envoi SMS
function envoyerSMS(phone, code) {
  console.log(`📲 Code ${code} envoyé à ${phone}`);
}

router.post('/', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Numéro requis' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await pool.query(
      'INSERT INTO auth_codes (phone, code) VALUES ($1, $2)',
      [phone, code]
    );

    envoyerSMS(phone, code);
    res.status(200).json({ message: 'Code envoyé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
