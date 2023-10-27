const express = require("express");
const {
  getLangauges,
  insertLanguage,
  getLanguageById,
  updateLanguageById,
  deleteLanguageById,
} = require("../controllers/language");
const { validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/languages", validateToken, getLangauges);
router.post("/languages", insertLanguage);
router.get("/languages/:id", getLanguageById);
router.put("/languages/:id", updateLanguageById);
router.delete("/languages/:id", deleteLanguageById);

module.exports = router;
