const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.json({ error: "User not authenicated" });
  }
  try {
    const validToken = verify(accessToken, process.env.API_SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error, message: "Failed to verify JWT" });
  }
};

module.exports = { validateToken };
