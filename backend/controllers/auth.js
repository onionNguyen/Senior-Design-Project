const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const queries = require("../query");
const generateDatabaseDateTime = require("./util/date");

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
    const countryResult = await queries.selectOp(
      "id",
      "country",
      ["name"],
      [country_name]
    );
    countryId = countryResult[0].id;

    const userId = await queries.insertOp(
      "user",
      [
        "first_name",
        "middle_name",
        "last_name",
        "mobile_phone",
        "work_phone",
        "home_phone",
        "email",
        "password",
        "country_id",
        "role_id",
        "status_id",
        "created_on",
        "created_by",
        "modified_on",
        "modified_by",
        "row_version",
      ],
      [
        first_name,
        middle_name ? middle_name : null,
        last_name,
        mobile_phone,
        work_phone ? work_phone : null,
        home_phone ? home_phone : null,
        email,
        encryptedPassword,
        countryId,
        1,
        1,
        generateDatabaseDateTime(new Date()),
        1,
        generateDatabaseDateTime(new Date()),
        1,
        1,
      ]
    );
    res.status(200).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await queries.selectOp("*", "user", ["email"], [email]);
    const user = userResult[0];

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

module.exports = { register, login };
