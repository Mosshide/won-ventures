const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Import my Data
const User = require("../models").user;

router.get("/register", function(req, res) {
    res.render("user/register",
    {
        siteTitle: "Won Ventures | Register",
        info: "",
        color: "green"
    });
});

router.post("/register", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ username: req.body.username });

        if (!foundAccount) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            let qAuth = await User.create({
                username: req.body.username,
                password: hash,
                cash: 0,
                stocks: [],
                watchlist: []
            });
    
            res.redirect("/");
        }
        else {
            res.render("user/register",
            {
                siteTitle: "Won Ventures | Register",
                info: "Registration Failed: Username taken!",
                color: "red"
            });
        }
    }
    catch(err) {
        console.log(err);

        res.render("user/register",
        {
            siteTitle: "Won Ventures | Register",
            info: "Registration Failed: Database error!",
            color: "red"
        });
    }
});

router.get("/login", function(req, res) {
    res.render("user/login", 
    { 
        siteTitle: "Won Ventures | Login",
        info: "",
        color: "green" 
    });
});

router.post("/login", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ username: req.body.username });

        if (foundAccount) {
            if (await bcrypt.compare(req.body.password, foundAccount.password)) {
                req.session.currentUser = { _id: foundAccount._id };

                res.redirect("/");
            }
            else {
                res.render("user/login.ejs",
                {
                    siteTitle: "Won Ventures | Login",
                    info: "Login Failed: Password incorrect!",
                    color: "red"
                });
            }
        }
        else {
            res.render("user/login.ejs",
            {
                siteTitle: "Won Ventures | Login",
                info: "Login Failed: Account does not exist!",
                color: "red"
            });
        }
    }
    catch(err) {
        console.log(err);

        res.render("user/login.ejs",
        {
            siteTitle: "Won Ventures | Login",
            info: "Login Failed: Database error!",
            color: "red"
        });
    }
});

router.delete("/logout", async function(req, res) {
    try {
        await req.session.destroy();

        res.redirect("/login",
        {
            siteTitle: "Won Ventures | Login",
            info: "Logout successful!",
            color: "red"
        });
    }
    catch {

    }
});

router.get("/user", function(req, res) {
    try {

        res.render("user/show", { siteTitle: "Won Ventures | Account" });
    }
    catch {
        res.redirect("/login",
        {
            siteTitle: "Won Ventures | Login",
            info: "Account Deleted! Account does not exist.",
            color: "red"
        });
    }
});

module.exports = router;