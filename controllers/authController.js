// backend/controllers/authController.js
const { findUser, createUser } = require('../database/userModel');

async function login(req, res) {
  const { name, phone } = req.body;

  try {
    const user = await findUser(name, phone);
    if (!user) {
      return res.status(401).json({ message: 'Informations incorrectes' });
    }
    // Ici on peut générer un token ou code validation (simplifié)
    res.json({ message: 'Connexion réussie', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function register(req, res) {
  const { name, phone, firstname } = req.body;

  try {
    // Vérifier si user existe déjà (à implémenter si besoin)
    const newUser = await createUser({ name, phone, firstname });
    res.status(201).json({ message: 'Utilisateur créé', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  login,
  register,
};
