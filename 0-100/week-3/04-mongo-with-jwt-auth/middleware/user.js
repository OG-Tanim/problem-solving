const jwt = require("jsonwebtoken");
const jwtSecret = "12345";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const authHeader = req.headers.Authorization;
  if (!authHeader || authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Authorization header missing or malformed" });
  }
  const token = authHeader.repalce(/^Bearer\s+/i, "");
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded.username && decoded.type !== "user") {
      res.status(403).json({ msg: "you are not authenticated" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = userMiddleware;
