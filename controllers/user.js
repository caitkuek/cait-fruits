const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { hashSync } = require("bcrypt");

const users = express.Router();
const saltRounds = bcrypt.genSaltSync(10);

users.get("/seed", async (req, res) => {

    // bcrypt.hash("123", saltRounds, function(err ,hash) {
    //     console.log(hash);
    // });

    try {
        await User.deleteMany();
        const newUsers = await User.create([
            {
                username: "caitlin",
                password: bcrypt.hashSync("123", saltRounds),
            },
        ]);
        res.send(newUsers);
    } catch (error) {
        res.send(error); 
    }
});

// hashed password (1 way) - fast!
// math function -> pass in input -> get the same output
// no collision -> diff input -> same output

// encryption <--> decryption (2way) - slow!!!!

users.post("/", async (req, res) => {
    const { username, password } = req.body;
    // const hashPassword = bcrypt.hashSync(password, saltRounds);
    const user = await User.findOne({ username })
    if (user === null) {
        res.send("login fail");
    } else {
        if (bcrypt.compareSync(password, user.password)) {
        //? create the session and set user key & value
        //? also set the cookie (middleware -> response) - AAA
        // console.log("session", req.session)
        req.session.user = user
        res.send(user)
    } else {
        res.send("password fail")
    }}
});

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next();
    } else {
      res.send("login fail");
    }
  };

// cookie - AAA -> Middleware -> req.session
users.get("/secret", isAuthenticated, async (req,res) => {
    res.send(req.session.user)
})

module.exports = users;
