const express = require('express');
const router = express.Router();
const pool = require('../database'); // adapte le chemin selon ton projet

// 👉 POST /api/auth/login
router.post('/login', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: true, message: 'Nom et téléphone requis' });
  }

  try {
    const query = 'SELECT * FROM accounts WHERE name = $1 AND phone = $2';
    const values = [name, phone];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      // Utilisateur trouvé
      return res.status(200).json({
        error: false,
        message: 'Connexion réussie',
        user: result.rows[0],
      });
    } else {
      // Aucune correspondance
      return res.status(401).json({
        error: true,
        message: 'Nom ou téléphone incorrect',
      });
    }
  } catch (err) {
    console.error('Erreur de connexion :', err);
    return res.status(500).json({ error: true, message: 'Erreur serveur' });
  }
});

module.exports = router;
