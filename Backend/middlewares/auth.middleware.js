const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.get("Authorization") || req.get("authorization");
  if (!header) return res.status(401).json({ msg: "No token" });

  const parts = header.split(" ").filter(Boolean);
  let token;
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
    token = parts[1];
  } else {
    token = header.trim();
  }

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user || decoded;
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ msg: "Token invalid" });
  }
};
