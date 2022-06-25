const { date } = require('joi');
const mongoose = require('mongoose');

const createMenuSchema = mongoose.Schema({
    items: {
        type: [String],
        reqired: false
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

module.exports = mongoose.model('ShopingCart', createMenuSchema)


