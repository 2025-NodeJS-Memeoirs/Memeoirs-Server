const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("토큰이 없습니다!");

  jwt.verify(token, "비밀키", (err, user) => {
    if (err) return res.status(403).send("토큰이 유효하지 않습니다!");

    req.user = user; // userId가 담겨 있음
    next();
  });
};

module.exports = authenticateToken;