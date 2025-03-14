/**
 * @swagger
 * /api/utilisateur/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Crée un utilisateur et retourne un token JWT.
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ranaivo Andry Ny Avo
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 example: ranaivoonenantsoa@gmail.com
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 example: "password1234"
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Authentifie un utilisateur et retourne un token JWT.
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ranaivoonenantsoa@gmail.com
 *                 description: Adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 example: "password1234"
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur authentifié avec succès
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/show_utilisateur:
 *   get:
 *     summary: Afficher tous les utilisateurs
 *     description: Retourne une liste de tous les utilisateurs.
 *     tags: [Utilisateur]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/show_utilisateur_by_id/{id}:
 *   get:
 *     summary: Afficher un utilisateur par ID
 *     description: Retourne un utilisateur basé sur son ID.
 *     tags: [Utilisateur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/update_utilisateur/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     description: Met à jour les informations d'un utilisateur basé sur son ID.
 *     tags: [Utilisateur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ranaivo Andry Ny Avo
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 example: ranaivoonenantsoa@gmail.com
 *                 description: Adresse email de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/delete_utilisateur/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur basé sur son ID.
 *     tags: [Utilisateur]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/utilisateur/get_api_key:
 *   get:
 *     summary: Récupérer l'API-KEY de l'utilisateur
 *     description: Retourne l'API-KEY de l'utilisateur authentifié.
 *     tags: [Utilisateur]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: API-KEY récupérée avec succès
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */

import express from "express";
import authenticationToken from "../authWebToken.js";
import utilisateurController from "../controller/utilisateurControleur.js";
import apiKeyMiddleware from "../middleware/apiKeyMiddleware.js";

const router = express.Router();

router.post("/register", utilisateurController.register);
router.post("/login", utilisateurController.login);
router.get(
  "/show_utilisateur",
  authenticationToken,
  apiKeyMiddleware,
  utilisateurController.show_utilisateur
);
router.get(
  "/show_utilisateur_by_id/:id",
  authenticationToken,
  apiKeyMiddleware,
  utilisateurController.show_utilisateur_by_id
);
router.put(
  "/update_utilisateur/:id",
  authenticationToken,
  apiKeyMiddleware,
  utilisateurController.update_utilisateur
);
router.delete(
  "/delete_utilisateur/:id",
  authenticationToken,
  apiKeyMiddleware,
  utilisateurController.delete_utilisateur
);
router.get(
  "/get_api_key",
  authenticationToken,
  utilisateurController.getApiKey
);

export default router;
