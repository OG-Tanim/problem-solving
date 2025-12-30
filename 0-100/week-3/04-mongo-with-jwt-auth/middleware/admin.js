// Middleware for handling auth
const jwt = require("jsonwebtoken");
const { Admin } = require("../db/index");
const jwtSecret = "12345";

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const authHeader = req.headers.Authorization;
  if (!authHeader || authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Authorization header missing or malformed" });
  }
  const token = authHeader.repalce(/^Bearer\s+/i, "");
  try {
    const decoded = jwt.verify(token, jwtSecret);
    await Admin.findOne({ username: decoded.username }).then((data) => {
      if (!data) {
        res.staus(403).json({ msg: "not an Admin" });
      } else {
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = adminMiddleware;
