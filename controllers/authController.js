const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      if (!firstname)
        return res.status(400).json({ message: "Please Enter Firstname" });

      if (!lastname)
        return res.status(400).json({ message: "Please Enter Lastname" });

      if (!email)
        return res.status(400).json({ message: "Please Enter Email" });

      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ message: "Your email address is already in use." });

      if (!password)
        return res.status(400).json({ message: "Please Enter Password" });
      if (password.length < 6)
        return res.status(400).json({
          message: "Your password must be at least 6 characters long",
        });

      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashPassword,
      });
      console.log(newUser);

      return res.status(200).json({ message: "Successfully Saved All Data" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  generateToken: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
