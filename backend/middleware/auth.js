const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("=== AUTH MIDDLEWARE ===");

  // Get token from header
  const token =
    req.header("x-auth-token") ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token received:", token ? "Yes" : "No");
  console.log("Headers:", {
    "x-auth-token": req.header("x-auth-token") ? "Present" : "Missing",
    authorization: req.header("Authorization") ? "Present" : "Missing",
  });

  // Check if no token
  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified, decoded:", decoded);
    req.user = decoded.user || decoded;
    console.log("✅ User set:", req.user);
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};
