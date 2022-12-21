const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddle = require("../middleware/authMiddle");
const config = require("config");
const router = express.Router();

router.get('/', (req, res) => {

  return res.send(`Hello world`)
})

router.get("/get_token", async (req, res) => {
  const userObj =  { userId: "1234", userName: "CAPTAIN DAVE", role: 1}
  const token = jwt.sign(
    userObj,
    process.env.JWT_SECRET
  );

  return res
    .cookie("auth_token", token)
    .json(userObj);
});

router.get("/protected", authMiddle , async (req, res) => {

    const { userName, id } = req.user;
    return res.json({ msg: `Hello again ${userName}, your userId is ${id}`})

})

router.get("/unprotected", async (req, res) => {

    return res.json({ msg: `Hello Mr.No-Token` })

})

router.get("/logout", authMiddle, async (req, res) => {
    console.log(req.user)
    const { userName, userId } = req.user;
    return res.clearCookie("auth_token").json({ msg: `Goodbye ${userName}` })

})

module.exports = router;
