const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Import my Data
const User = require("../models").user;

router.get("/register", function(req, res) {
    res.render("user/register", { siteTitle: "Won Ventures | Register" });
});

router.post("/register", async function(req, res) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        let qAuth = await Auth.create({
            name: req.body.name,
            email: req.body.text,
            password: hash
        });

        res.redirect("/login",
        {
            siteTitle: "Won Ventures | Login",
            info: "Registration successfull! Please login.",
            color: "green"
        });
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/login", function(req, res) {
    res.render("user/login", { siteTitle: "Won Ventures | Login" });
});

router.post("/login", async function(req, res) {
    try {
        const foundAccount = await Auth.find({ email: req.body.email });

        if (foundAccount) {
            if (await bcrypt.compare(req.body.password, foundAccount.password)) {
                req.session.currentUser = {
                    _id: foundAccount._id
                };
            };
        }
        else {
            res.redirect("auth/login",
            {
                siteTitle: "Won Ventures | Login",
                info: "Login Failed: Account does not exist.",
                color: "red"
            });
        }       
    }
    catch(err) {
        console.log(err);
    }
});

router.delete("/logout", async function(req, res) {
    await req.session.destroy();

    res.redirect("auth/login",
    {
        siteTitle: "Won Ventures | Login",
        info: "Account Deleted! Account does not exist.",
        color: "red"
    });
});

router.get("/user", function(req, res) {
    res.render("user/show", { siteTitle: "Won Ventures | Account" });
});

module.exports = router;