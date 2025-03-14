import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const option = {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  };
  if (typeof payload !== "object") {
    throw new Error("Invalid payload");
  }
  const token = jwt.sign(payload, secretKey, option);
  return token;
};

const generateApiKey = () => {
  return crypto.randomBytes(20).toString("hex");
};

export { generateToken, generateApiKey };
