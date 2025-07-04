const Position = require('../models/Position');

// GET : Récupérer toutes les positions
const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

// POST : Enregistrer une nouvelle position
const createPosition = async (req, res) => {
  const { vehiculeId, latitude, longitude, vitesse, timestamp } = req.body;
  
  const newPosition = new Position({
    vehiculeId,
    latitude,
    longitude,
    vitesse,
    timestamp,
  });

  try {
    await newPosition.save();
    res.status(201).json({ message: 'Position enregistrée', data: newPosition });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'enregistrement de la position', error: err });
  }
};

// PUT : Modifier une position existante
const updatePosition = async (req, res) => {
  const positionId = req.params.id;
  const updates = req.body;

  try {
    const updated = await Position.findByIdAndUpdate(positionId, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Position non trouvée' });
    }
    res.status(200).json({ message: 'Position mise à jour', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err });
  }
};

// DELETE : Supprimer une position
const deletePosition = async (req, res) => {
  const positionId = req.params.id;

  try {
    const deleted = await Position.findByIdAndDelete(positionId);
    if (!deleted) {
      return res.status(404).json({ message: 'Position non trouvée' });
    }
    res.status(200).json({ message: 'Position supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err });
  }
};

// Exporter toutes les fonctions
module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition
};
