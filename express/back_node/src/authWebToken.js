import jwt from "jsonwebtoken";

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader.split(" ")[1];

  console.log(token);

  if (!token)
    return res.status(401).json({
      success: false,
      message: "token is not valid",
    });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    console.log(err);
    console.log(user);

    if (err)
      return res.status(403).json({
        success: false,
        message: "no token available ",
      });
    (req.user = user), next();
  });
};

export default authenticationToken;
