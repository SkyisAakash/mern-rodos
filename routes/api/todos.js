const express = require("express");
const router = express.Router();
const Todo = require('../../models/Todo');
const mongoose = require('mongoose');
const passport = require('passport');
const validateTodoInput = require('../../validations/todos_validator');

router.get("/test", (req, res) => res.json({ msg: "This is the todos route" }));
router.get('/', (req, res) => {
    User.findOne({"_id": req.body.id})
        .then((user) => {
            console.log(user);
            Todo.find({user: user._id})
                .then(todos => res.json(todos))
                .catch(err => 
                    res.status(404).json({ noTodoFound: 'NO todos found' }));
        })

})

router.post('/', passport.authenticate('jwt', {session: false}),
(req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id
    });
    newTodo.save().then(todo => res.json(todo));
})
module.exports = router;
