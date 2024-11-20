const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db"); // Import database connection
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// User registration endpoint
app.post("/api/users", async (req, res) => {
  const { name, lastName, email, username, password } = req.body;

  // Basic validation
  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the username or email already exists
    const checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(checkQuery, [username, email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).send({ message: "Username or Email already exists" });
      }

      // Insert the new user into the database
      const insertQuery = "INSERT INTO users (name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)";
      db.query(insertQuery, [name, lastName, email, username, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: "Database error" });
        }
        res.status(201).send({ message: "User registered successfully" });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error hashing password" });
  }
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
