const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body.user;

  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECKEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("Falsche Angaben");
    }

    const hashedPw = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECKEY
    );

    const originalPassword = hashedPw.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Falsche Angaben");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECKEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
