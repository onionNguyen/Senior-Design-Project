const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const register = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    mobile_phone,
    work_phone,
    home_phone,
    email,
    password,
    country_name,
  } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 8);
    const country_result = await db.query(
      'SELECT id FROM "uARexpert_test_schema_001".country WHERE name = $1',
      [country_name]
    );
    country_id = country_result.rows[0].id;
    const result = await db.query(
      'INSERT INTO "uARexpert_test_schema_001".user (first_name, middle_name, last_name, mobile_phone, work_phone, home_phone, email, password, country_id, role_id, status_id, created_on, created_by, modified_on, modified_by, row_version) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id',
      [
        first_name,
        middle_name ? middle_name : null,
        last_name,
        mobile_phone,
        work_phone ? work_phone : null,
        home_phone ? home_phone : null,
        email,
        encryptedPassword,
        country_id,
        1,
        1,
        generateDatabaseDateTime(new Date()),
        1,
        generateDatabaseDateTime(new Date()),
        1,
        1,
      ]
    );
    const userId = result.rows[0].ID;
    res.status(200).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM "uARexpert_test_schema_001".user WHERE email = $1',
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.ID,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    return res.status(200).json({
      user: {
        id: user.ID,
        name: user.name,
        email: user.email,
      },
      message: "Login successful",
      assessToken: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateDatabaseDateTime = (date) => {
  return date.toISOString().replace("T", " ").substring(0, 19);
};

module.exports = { register, login };
