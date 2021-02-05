const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password can not include word \"password\"")
            }
        }
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User