const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { ENVIORMENTAL_VARIABLES } = require("../config/config");

const secretKey = ENVIORMENTAL_VARIABLES.JWT_SECRET;

const UserController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;

      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userRole = role ? role.toLowerCase() : "user";
      const newUser = await User.create({
        id: uuidv4(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: userRole,
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  loginUser: async (req, res) => {
    console.log(secretKey);
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1d",
      });

      res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
