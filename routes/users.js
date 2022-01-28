const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

//@route    GET api/user/info
//@desc     Get user info route
//@access   Private
router.get("/info", auth, async (req, res) => {
  try {
    const info = await User.findById(req.user.id).select("-password");
    res.json({ info });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    PUT api/user
//@desc     Update user info
//@access   Private
router.put("/", auth, async (req, res) => {
  try {
    const info = await User.findOneAndUpdate(
      {
        _id: req.user.id
      },
      {
        $set: { ...req.body }
      }
    );
    res.json({ status: "success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/user/register
//@desc     Register route
//@access   Public
router.post(
  "/register",
  [
    check("firstName", "First Name is required!").not().isEmpty(),
    check("lastName", "Last Name is required!").not().isEmpty(),
    check("phoneNumber", "Phone Number is required!").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter as password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phoneNumber, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return jsonwebtoken JWT
      const payload = {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    GET api/users/list
//@desc     Get all users list
//@access   Private
router.get("/list", auth, async (req, res) => {
  try {
    const list = await User.find().select("-password");
    res.json({ users: list });
  } catch (err) {
    console.error(err.message);
    res.send(500).send("Server Error!");
  }
});

module.exports = router;
