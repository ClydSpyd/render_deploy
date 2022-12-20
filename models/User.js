const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    memberSince:{
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);