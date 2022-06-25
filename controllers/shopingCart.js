const { query, response } = require('express');
const Joi = require('joi');
const { shopingService } = require("../services")



const createShopingCart = async (req, res) => {
    const userId = (req.tokenData.userId || '')
    let bodyData = (req.body || {})
    let query = (req.query || {})
    const schema = Joi.object({
        items: Joi.string().required(),
    })

    if (!userId) {
        return res.status(204).json({ message: "Login expired! Please login again", code: 204 })
    }

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
        resolve(shopingService.post(payload))
    }
    )
        .then(data => {
            // res.send(data)
            return res.status(201).json({
                message: 'added to shoping cart successfully!',
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


module.exports = {
    createShopingCart
}