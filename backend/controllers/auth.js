const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 8);
    const result = await db.query(
      'INSERT INTO se4485_test_schema.users (name, email, password) VALUES ($1, $2, $3) RETURNING "ID"',
      [name, email, encryptedPassword]
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
      "SELECT * FROM se4485_test_schema.users WHERE email = $1",
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

module.exports = { register, login };
