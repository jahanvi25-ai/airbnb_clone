const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function toPublicUser(user) {
  return {
    id: user._id,
    FirstName: user.FirstName,
    LastName: user.LastName,
    email: user.email,
    userType: user.userType,
  };
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ message: "Invalid password" });
    }

    const token = signToken(user);
    res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
};

// Same validation rules as the original postSignup, just returning JSON
// instead of re-rendering an EJS page with the errors.
exports.signupValidation = [
  check("FirstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should only contain alphabets"),

  check("LastName")
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last name can only contain alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one upper case letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lower case letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(){}<>]/)
    .withMessage("Password must contain at least one special character"),

  check("confirmedPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
    .notEmpty()
    .withMessage("Choose an account type")
    .isIn(["guest", "host"])
    .withMessage("Invalid account type"),

  // Original checked for the literal string "on" (how a plain HTML form
  // encodes a checked checkbox). A React form posting JSON sends a real
  // boolean instead, so we check for that.
  check("terms")
    .custom((value) => value === true)
    .withMessage("Please accept the terms and conditions"),
];

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array().map((e) => e.msg) });
    }

    const { FirstName, LastName, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ FirstName, LastName, email, password: hashedPassword, userType });
    await user.save();

    const token = signToken(user);
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(422).json({ errors: ["An account with that email already exists"] });
    }
    next(err);
  }
};

// Frontend calls this on load (if a token is stored) to restore the
// logged-in state, since there's no server session to check anymore.
exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
};
