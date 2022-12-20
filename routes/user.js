const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route  POST /api/user
// @desc register user
// @access public
router.post(
  "/",
  [
    check("userName", "No userName provided").not().isEmpty(),
    check("password", "No password provided").not().isEmpty(),
    check("password", "Password should be 6 characters or more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          errors: errors.array().map(({ msg, param }) => ({ msg, param })),
        });
    }

    const { userName, password } = req.body;

    try {
      let user = await User.findOne({ userName });

      if (user) {
        return res.status(400).json({ msg: "Username already exists" });
      }

      user = new User({ userName, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const authTokenPayload = { userName, id: user.id };

      const authToken = jwt.sign(authTokenPayload, config.get("jwtSecret"));

      return res
        .status(200)
        .cookie("auth_token", authToken)
        .json(authTokenPayload);    
    } catch (err) {}
  }
);

module.exports = router;
