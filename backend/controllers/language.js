const queries = require("../query");
const generateDatabaseDateTime = require("./util/date");

const getLangauges = async (req, res) => {
  try {
    const result = await queries.selectOp("*", "language");
    res.status(200).json({ languages: result });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const insertLanguage = async (req, res) => {
  const { name, iso_639_1_code, iso_639_2_code } = req.body;

  try {
    const languageId = await queries.insertOp(
      "language",
      [
        "name",
        "iso_639_1_code",
        "iso_639_2_code",
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
        iso_639_1_code,
        iso_639_2_code,
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
      .json({ message: "Language inserted successfully", languageId });
  } catch (error) {
    console.error("Error inserting languages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLanguageById = async (req, res) => {
  try {
    const languageId = req.params.id;

    const result = await queries.selectOp(
      "*",
      "language",
      ["id"],
      [languageId]
    );
    res.status(200).json({ langauge: result });
  } catch (error) {
    console.error("Error fetching langauge:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateLanguageById = async (req, res) => {
  try {
    const languageId = req.params.id;
    const { name, iso_639_1_code, iso_639_2_code } = req.body;

    const result = await queries.updateOp(
      "language",
      ["name", "iso_639_1_code", "iso_639_2_code", "modified_on"],
      [
        name,
        iso_639_1_code,
        iso_639_2_code,
        generateDatabaseDateTime(new Date()),
      ],
      ["id"],
      [languageId]
    );
    res.status(200).json({ message: "Language updated successfully" });
  } catch (error) {
    console.error("Error updating language:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteLanguageById = async (req, res) => {
  try {
    const languageId = req.params.id;

    const result = await queries.deleteOp("language", ["id"], [languageId]);
    res.status(200).json({ message: "Language deleted successfully" });
  } catch (error) {
    console.error("Error deleting language:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getLangauges,
  insertLanguage,
  getLanguageById,
  updateLanguageById,
  deleteLanguageById,
};
