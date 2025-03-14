import db from "../config/db_postgres.js";
import { generateToken, generateApiKey } from "../utils.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    // Crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const apiKey = generateApiKey();

    // Enregistrer l'utilisateur avec le mot de passe crypté
    const token = generateToken(data);
    await db.query(
      `INSERT INTO utilisateurs (name, email, password, api_key) VALUES ($1, $2, $3, $4)`,
      [name, email, hashedPassword, apiKey]
    );

    res.json({
      success: true,
      message: "Admin created successfully",
      token: token,
      api_key: apiKey,
      status: 201,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error creating admin",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, api_key } = req.body;

    // Vérifier que l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Récupérer l'utilisateur par email
    const { rows: results } = await db.query(
      "SELECT email, password, api_key FROM utilisateurs WHERE email = $1",
      [email]
    );
    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: no user found",
      });
    }

    const admin = results[0];

    // Comparer le mot de passe fourni avec le mot de passe crypté
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: invalid password",
      });
    }

    // Génération du token
    const token = generateToken({ email: admin.email }); // Passer un objet comme payload

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token: token,
      api_Key: admin.api_key,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const show_utilisateur = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM utilisateurs");
    const data = result.rows;
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No status found",
      });
    }
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting status",
      error: error,
    });
  }
};

const show_utilisateur_by_id = async (req, res) => {
  try {
    const show_utilisateur = req.params.id;
    if (!show_utilisateur) {
      return res.status(404).send({
        success: false,
        message: "No Propos with this id",
      });
    }

    const result = await db.query(`SELECT * FROM utilisateurs WHERE id = $1`, [
      show_utilisateur,
    ]);
    const data = result.rows; // Accédez à rows

    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No post found with this id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Post successfully fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

const update_utilisateur = async (req, res) => {
  try {
    const utilisateur_id = req.params.id;
    if (!utilisateur_id) {
      return res.status(400).send({
        success: false,
        message: "No utilisateurs ID provided",
      });
    }
    const { name, email, password } = req.body;
    const { rowCount } = await db.query(
      "UPDATE utilisateurs SET name = $1, email = $2, password = $3 WHERE id = $4",
      [name, email, password, utilisateur_id]
    );
    if (rowCount === 0) {
      return res.status(404).send({
        success: false,
        message: "No utilisateurs found with that ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "Admin updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating admin",
      error: error.message,
    });
  }
};

const delete_utilisateur = async (req, res) => {
  try {
    const utilisateurs_id = req.params.id;
    if (!utilisateurs_id) {
      return res.status(400).send({
        success: false,
        message: "No user ID provided",
      });
    }
    const { rowCount } = await db.query(
      "DELETE FROM utilisateurs WHERE id = $1",
      [utilisateurs_id]
    );
    if (rowCount === 0) {
      return res.status(404).send({
        success: false,
        message: "No user found with that ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting admin",
      error: error.message,
    });
  }
};

const getApiKey = async (req, res) => {
  try {
    const email = req.user.email;
    const { rows } = await db.query(
      "SELECT api_key FROM utilisateurs WHERE email = $1",
      [email]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      apiKey: rows[0].api_key,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default {
  register,
  login,
  show_utilisateur,
  show_utilisateur_by_id,
  update_utilisateur,
  delete_utilisateur,
  getApiKey,
};
