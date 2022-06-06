const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userID: decoded.userID,
      name: decoded.name,
      role: decoded.role,
    };
    next();
  } catch (error) {
    throw new Error("Not authorized to access this route");
  }
};

module.exports = { authenticationMiddleware };
