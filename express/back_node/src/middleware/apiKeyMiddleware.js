import db from "../config/db_postgres.js";

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key is missing",
    });
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM utilisateurs WHERE api_key = $1",
      [apiKey]
    );
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default apiKeyMiddleware;
