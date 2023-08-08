const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.get("/auth/login", async function (req, res, next) {
    try {
        // Get user input
        const { email, password } = req.query;
        const user = await controller.userLogin(email, password);
        console.log(user);
        // user
        if (user) {
            res.cookie("access_token", user.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });
            res.cookie("user", user);
            res.cookie("IDUser", user.id);
            res.status(200).json(user);
        } else {
            res.status(200).json({ success: false, msg: "Invalid Credentials" });
        }

    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/auth/logout", async function (req, res, next) {
    res.status(200);
});

module.exports = router;