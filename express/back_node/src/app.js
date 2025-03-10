import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import pool from "./config/db_postgres.js";
import utilisateur from "./routes/utilisateurRoutes.js";
import cors from "cors";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";

dotenv.config();
const app = express();
// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test api with express",
      version: "1.0.0",
      description: "A simple API express with users",
      contact: {
        name: "RANAIVO Anddry Ny Avo Onenantsoa",
        url: "",
        email: "ranaivoonenantsoa@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerjsdoc(options);

// Route pour la documentation Swagger
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));

// Routes API
app.use("/api/utilisateur", utilisateur);

// Start the server
const PORT = process.env.PORT || 3000;
pool
  .query("SELECT 1")
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
