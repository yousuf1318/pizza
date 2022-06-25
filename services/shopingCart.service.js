const shoping = require('../models/shopingCart');

const post = (payload) => shoping.create(payload);
const findOne = condition => shoping.findOne(condition);
const find = (condition, options) => shoping.findOne(condition).select(options);
const get = ( condition,options) => shoping.find(condition).skip(options.skip).limit(options.limit).select('-__v');
const count = (condition) => shoping.count(condition)

module.exports = {
    post,
    findOne,
    get,
    count,
    find,
}
