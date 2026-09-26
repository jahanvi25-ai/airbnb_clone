const jwt = require("jsonwebtoken");

// Verifies the Bearer token and attaches { id, userType } to req.user.
// Replaces the old express-session cookie check — the frontend and backend
// now run on different origins, so a stateless token is simpler and avoids
// cross-origin cookie headaches.
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You must be logged in" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, userType }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Session expired, please log in again" });
  }
}

// Use after requireAuth. Mirrors the old `req.isAdmin` check
// (userType === 'host') that gated the /admin/* routes.
function requireHost(req, res, next) {
  if (req.user?.userType !== "host") {
    return res.status(403).json({ message: "Host account required" });
  }
  next();
}

module.exports = { requireAuth, requireHost };
