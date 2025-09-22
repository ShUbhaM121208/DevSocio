const express = require('express');
const profileRouter = express.Router();
const jwt = require('jsonwebtoken');
const {userAuth} = require('../middlewares/auth');


profileRouter.get("/profile",userAuth,  async (req, res) => {
    try {
        const user = req.user;  // fetch user

        res.status(200).send(user);  // send user profile
    } catch (err) {
        // console.error(err);
        res.status(401).send("Unauthenticated");
    }
});

module.exports = profileRouter;