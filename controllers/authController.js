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
      if (!validateEmail(email))
        return res.status(400).json({ message: "Email Is Invalid" });
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

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("RefreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refreshToken",
        maxAge: 24 * 60 * 60 * 30 * 1000,
      });

      await newUser.save();

      return res.status(200).json({
        message: "Successfully Saved All Data",
        accessToken: accessToken,
        user: { ...newUser._doc, password: "" },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const theUser = await User.findOne({ email });

      if (!theUser)
        return res
          .status(400)
          .json({ message: "Password Or Email Not Found. Please Try Again!!" });

      const isMach = await bcrypt.compare(password, theUser.password);

      if (!isMach)
        return res
          .status(400)
          .json({ message: "Password Or Email Not Found. Please Try Again!!" });

      const accessToken = createAccessToken({ id: theUser._id });
      const refreshToken = createRefreshToken({ id: theUser._id });

      res.cookie("RefreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refreshToken",
        maxAge: 24 * 60 * 60 * 30 * 1000,
      });
      console.log(theUser);
      return res.status(200).json({
        message: `Welcome Back Mr/Mrs ${theUser._doc.firstname}`,
        accessToken: accessToken,
        user: { ...theUser._doc, password: "" },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("RefreshToken", { path: "/api/refreshToken" });
      res.json({ message: "You Are Not Authenticated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  generateToken: async (req, res) => {
    try {
      const rf_Token = req.cookies.RefreshToken;
      if (!rf_Token)
        return res.json({
          message: "Please Login",
        });
      jwt.verify(
        rf_Token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.json({
              message: "Please Login",
            });

          const userId = User.findById(result.id);
          if (!userId) return res.json({ message: "This User Do Not Exist" });
          const accessToken = createAccessToken({ id: result.id });
          console.log(userId);
          return res.json({
            refreshToken: rf_Token,
            accessToken: accessToken,
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = userController;
