const express = require('express');
const router = express.Router();
const {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition
} = require('../controllers/positionsController');

/**
 * @swagger
 * tags:
 *   name: Positions
 *   description: API de suivi GPS
 */

/**
 * @swagger
 * /api/positions:
 *   get:
 *     summary: Voir toutes les positions GPS enregistrées
 *     tags: [Positions]
 *     responses:
 *       200:
 *         description: Liste des positions GPS
 */
router.get('/', getAllPositions);

/**
 * @swagger
 * /api/positions:
 *   post:
 *     summary: Enregistrer une nouvelle position GPS
 *     tags: [Positions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehiculeId
 *               - latitude
 *               - longitude
 *             properties:
 *               vehiculeId:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               vitesse:
 *                 type: number
 *     responses:
 *       201:
 *         description: Position enregistrée avec succès
 */
router.post('/', createPosition);

/**
 * @swagger
 * /api/positions/{id}:
 *   put:
 *     summary: Modifier une position GPS existante
 *     tags: [Positions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la position GPS
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehiculeId:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               vitesse:
 *                 type: number
 *     responses:
 *       200:
 *         description: Position mise à jour avec succès
 */
router.put('/:id', updatePosition);

/**
 * @swagger
 * /api/positions/{id}:
 *   delete:
 *     summary: Supprimer une position GPS
 *     tags: [Positions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la position GPS
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Position supprimée avec succès
 */
router.delete('/:id', deletePosition);

module.exports = router;
