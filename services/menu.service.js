const Menus = require('../models/menu');

const post = (payload) => Menus.create(payload);
const findOne = condition => Menus.findOne(condition);
const find = (condition, options) => Menus.findOne(condition).select(options);
const get = ( condition,options) => Menus.find(condition).skip(options.skip).limit(options.limit).select('-__v');
const count = (condition) => Menus.count(condition)

module.exports = {
    post,
    findOne,
    get,
    count,
    find,
}
