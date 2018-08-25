const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jsonwebtoken = require('jsonwebtoken');
const passport = require('passport');
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', (req, res) => {
    console.log(req.body);
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
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // console.log('--------------');
                        if (err) console.log(err);
                        // console.log('--------------');
                        newUser.password = hash;
                        // console.log('new USer' + newUser);
                        // console.log('hash' + hash)
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    User.findOne({email})
        .then( user => {
            if(!user) {
                return res.status(404).json({ email: 'This user does not exist'} );
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // res.json({ msg: 'Success' });
                        const payload = {id: user.id, name: user.name};
                        jsonwebtoken.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                        )
                    } else {
                        return res.status(400).json({password: 'Incorrect password'});
                    }
                })
        })
})


//Protected route for user show page
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({msg: 'Success'})
})
module.exports = router;
