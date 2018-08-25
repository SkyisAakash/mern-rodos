const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jsonwebtoken = require('jsonwebtoken');
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // validate: {
        //     validator: (name) => name.length > 1,
        //     message: "Name must be atleast two characters long"
        // }
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        // validate: {
        //     validator: (pass) => pass.length > 5,
        //     message: "Password must be atleast 6 characters long"
        // }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema);