const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({email: "Email Already in use"})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
            }
        })
})
module.exports = router;
