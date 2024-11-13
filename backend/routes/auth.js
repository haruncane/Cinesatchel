const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const returnMessage = require("../functions/returnMessage");

// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        usersurname: req.body.usersurname,
        email: req.body.email,
        secanswer: req.body.secanswer,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY)
    });
    try {
        const user = await newUser.save();
        returnMessage(res, 201, user);
    } catch(err) {
        returnMessage(res, 400, err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && returnMessage(res,401, "Email or Password not correct");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const userPassword = bytes.toString(CryptoJS.enc.Utf8);

        userPassword !== req.body.password && returnMessage(res,401, "Email or Password not correct");
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );
        const { password, ...info } = user._doc;
        returnMessage(res, 200, { ...info, accessToken });
    } catch(err) {
        returnMessage(res, 500, err);
    }
});

module.exports = router;