// routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// ✅ Route POST pour envoyer un code de vérification
router.post('/send-code', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Numéro requis' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Téléphone non trouvé' });
    }

    const code = Math.floor(1000 + Math.random() * 9000); // 🔐 Code à 4 chiffres

    // ✅ Sauvegarde du code dans une table 'verifications'
    await pool.query(
      'INSERT INTO verifications (phone, code, created_at) VALUES ($1, $2, NOW())',
      [phone, code]
    );

    console.log(`✅ Code envoyé à ${phone} : ${code}`);
    res.json({ message: 'Code envoyé' });
  } catch (error) {
    console.error('Erreur serveur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
