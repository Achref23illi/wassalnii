// backend/middleware/authenticate.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get the token from the Authorization header
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token
    // Assume the token format is "Bearer [token]"
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
