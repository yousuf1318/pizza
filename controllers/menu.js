
const { query, response } = require('express');
const Joi = require('joi');
const { menuService } = require("../services")





const createMenu = async (req, res) => {
    let bodyData = (req.body || {})
    let query = (req.query || {})
    const schema = Joi.object({
        restaurant_Name:Joi.string().required(),
        lunch: Joi.string().required(),
        dinner: Joi.string().required(),
        price: Joi.number().required()
    })
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({ message: schemaValidator.error.message || 'Bad Request!', code: 400 })
    } else {
        schemaValidator = schemaValidator.value
    }

    const payload = {
        ...schemaValidator,
    }

    // return
    new Promise((resolve, reject) => {
        resolve(menuService.post(payload))
    }
    )
        .then(data => {
            // res.send(data)
            return res.status(201).json({
                message: 'New menu created successfully!',
                status: 201,
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                status: 500
            })
        })
}


const getMenu = async (req, res) => {

    const userId  = (req.tokenData.userId || '')
    const schema = Joi.object({
        limit: Joi.number().default(10),
        skip: Joi.number().default(0),
        searchText: Joi.string().default('').allow(null, '')
    });

    if (!userId){
        return res.status(204).json({ message: "Login expired! Please login again", code: 204 })
    }

    let query = schema.validate(req.query);

    if (query.error) {
        return res.status(400).json({ message: query.error.message || 'Bad Request!', code: 400 })
    } else {
        query = query.value;
    }

    

    let page;
    page = {
        limit: query.limit,
        skip: query.skip
    }

    const sort = { _id: -1 }
    try {
        const result = await menuService.get(page, sort);
        const count = await menuService.count();
        if (!count || !result.length) {
            return res.status(204).json({
                message: 'No data found!',
                status: 204
            })
        }
        res.status(200).json({
            message: 'Success',
            status: 200,
            totalCount: count,
            data: result
        })
    }
    catch (err) {
        console.log(err)
        res.json({ message: err, status: 500 })
    }
}





module.exports = {
    createMenu,
    getMenu
}