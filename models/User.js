const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: false
    },
    mail: {
        type: String,
        required: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User

