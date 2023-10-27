const express = require("express");
const { register, login, auth } = require("../controllers/auth");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth", validateToken, auth);

module.exports = router;
