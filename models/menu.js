const { date } = require('joi');
const mongoose = require('mongoose');

const createMenuSchema = mongoose.Schema({
    restaurant_Name: {
        type: String,
        reqired: false
    },
    lunch: {
        type: String,
    },
    dinner: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
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

module.exports = mongoose.model('Menu', createMenuSchema)


