const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/', async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ message: 'Téléphone et code requis' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM auth_codes 
       WHERE phone = $1 AND code = $2 
       AND created_at > NOW() - INTERVAL '5 minutes'
       ORDER BY created_at DESC LIMIT 1`,
      [phone, code]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Code invalide ou expiré' });
    }

    // Optionnel : vérifier si l’utilisateur est autorisé
    const userCheck = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);

    if (userCheck.rows.length === 0) {
      return res.status(403).json({ message: 'Utilisateur non autorisé' });
    }

    res.status(200).json({ message: 'Connexion réussie', user: userCheck.rows[0] });
  } catch (err) {
    console.error('Erreur de vérification :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
