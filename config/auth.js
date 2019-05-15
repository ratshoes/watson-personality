const jwt = require("jsonwebtoken");
const { secret } = require("../config/settings");

const getTokenForUser = userObject => {
  return jwt.sign(userObject, secret, { expiresIn: "2h" });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(422).json({ error: "No auth token found matching that" });
  }
  jwt.verify(token, secret, (authError, decoded) => {
    if (authError) {
      res.status(403).json({
        error: "This token invalid please try again",
        message: authError
      });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  getTokenForUser,
  validateToken
};
