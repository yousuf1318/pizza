const { date } = require('joi');
const mongoose = require('mongoose');

const createUserSchema = mongoose.Schema({
    Name: {
        type: String,
        reqired: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    street_address: {
        type: Number,
        required: false
    },

    role: {
        type: String,
        required: true,
        default: "USER",
        enum: ["USER", "ADMIN"]
    },
    creationTs: {
        type: Date,
        default: Date.now,
        required: true

    },
    updatedTs: {
        type: Date,
        required: false,

    }
});

module.exports = mongoose.model('user', createUserSchema)


