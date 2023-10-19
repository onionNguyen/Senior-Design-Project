const queries = require("../query");
const generateDatabaseDateTime = require("./util/date");

const getCountries = async (req, res) => {
  try {
    const result = await queries.selectOp("*", "country");
    res.status(200).json({ countries: result });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const insertCountry = async (req, res) => {
  const { name, code, iso_code_2, iso_code_3 } = req.body;

  try {
    const countryId = await queries.insertOp(
      "country",
      [
        "name",
        "code",
        "iso_code_2",
        "iso_code_3",
        "sequence",
        "status_id",
        "created_on",
        "created_by",
        "modified_on",
        "modified_by",
        "row_version",
      ],
      [
        name,
        code,
        iso_code_2,
        iso_code_3,
        1,
        1,
        generateDatabaseDateTime(new Date()),
        1,
        generateDatabaseDateTime(new Date()),
        1,
        1,
      ]
    );
    res
      .status(200)
      .json({ message: "Country inserted successfully", countryId });
  } catch (error) {
    console.error("Error inserting countries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCountryById = async (req, res) => {
  try {
    const countryId = req.params.id;

    const result = await queries.selectOp("*", "country", ["id"], [countryId]);
    res.status(200).json({ country: result });
  } catch (error) {
    console.error("Error fetching country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCountryById = async (req, res) => {
  try {
    const countryId = req.params.id;
    const { name, code, iso_code_2, iso_code_3 } = req.body;

    const result = await queries.updateOp(
      "country",
      ["name", "code", "iso_code_2", "iso_code_3", "modified_on"],
      [
        name,
        code,
        iso_code_2,
        iso_code_3,
        generateDatabaseDateTime(new Date()),
      ],
      ["id"],
      [countryId]
    );
    res.status(200).json({ message: "Country updated successfully" });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCountryById = async (req, res) => {
  try {
    const countryId = req.params.id;

    const result = await queries.deleteOp("country", ["id"], [countryId]);
    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLanguagesForCountry = async (req, res) => {
  try {
    const countryId = req.params.id;

    const countryResult = await queries.selectOp(
      "language_id",
      "language_country",
      ["country_id"],
      [countryId]
    );
    const languageIds = countryResult.map((item) => item.language_id);
    const languageResult = await queries.selectOp(
      "name",
      "language",
      ["id"],
      languageIds
    );
    res.status(200).json({ languages: languageResult });
  } catch (error) {
    console.error("Error fetching languages for country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCountries,
  insertCountry,
  getCountryById,
  updateCountryById,
  deleteCountryById,
  getLanguagesForCountry,
};
