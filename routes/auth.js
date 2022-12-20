const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route     GET api/auth
// @desc      authenticate user & get token (login)
// @access    public
router.post(
  "/login",
  [
    check("username", "Please enter username").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          errors: errors.array().map(({ msg, param }) => ({ msg, param })),
        });
    }

    const { userName, password } = req.body;
    try {
      let userObj = await User.findOne({userName}).lean();
      
      console.log(userObj)

      if (!userObj) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials",
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, userObj.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials",
            },
          ],
        });
      }

      const token = jwt.sign({...userObj}, config.get("jwtSecret"));

      return res.cookie("auth_token", token).json({ id:userObj.id, userName: userObj.userName });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router

//   .select('-password')
