const express = require("express");
const {
  getCountries,
  insertCountry,
  getCountryById,
  updateCountryById,
  deleteCountryById,
  getLanguagesForCountry,
} = require("../controllers/country");
const router = express.Router();

router.get("/countries", getCountries);
router.post("/countries", insertCountry);
router.get("/countries/:id", getCountryById);
router.put("/countries/:id", updateCountryById);
router.delete("/countries/:id", deleteCountryById);
router.get("/countries/:id/languages", getLanguagesForCountry);

module.exports = router;
