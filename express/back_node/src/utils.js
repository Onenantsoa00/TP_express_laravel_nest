import jwt from "jsonwebtoken";

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
export { generateToken };
