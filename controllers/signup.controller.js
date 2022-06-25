const Axios = require('axios');
const { query, response } = require('express');
const Joi = require('joi');
const { isValidObjectId, Schema } = require('mongoose');
const { signupService } = require("../services")
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const saltRounds = 10;


const createUser = async (req, res) => {
    let bodyData = (req.body || {})
    let query = (req.query || {})
    const schema = Joi.object({
        Name:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        street_address: Joi.string().required(),
        phoneNumber: Joi.number().allow(null, ""),
        role: Joi.string().default('USER').allow("USER", "ADMIN"),
    })
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({ message: schemaValidator.error.message || 'Bad Request!', code: 400 })
    } else {
        schemaValidator = schemaValidator.value
    }
    try {
        const conditions = {
            email: schemaValidator.email
        }
        const existingUser = await signupService.findOne(conditions);
        // console.log(existingUser)
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists!",
                status: 409
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
    let payload = {};
    const encryptedPass = await bcrypt.hash(schemaValidator.password, saltRounds);
    payload['password'] = encryptedPass;

    const userData = {
        ...schemaValidator,
        ...payload
    }

    // return
    new Promise((resolve, reject) => {
        resolve(signupService.post(userData))
    }
    )
        .then(data => {
            // res.send(data)
            return res.status(201).json({
                message: 'New user created successfully!',
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


const updateUser = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.string().required()
    })
    const validateSchema = schema.validate(req.body);
    let reqPayload;
    // validating payload
    if (validateSchema.error) {
        return res.status(400).json({
            message: validateSchema.error.message || "Bad Request",
            code: 400
        })
    } else {
        reqPayload = validateSchema.value;
    }
    // res.send(reqPayload)
    try {
        // validatinng for existing user
        const existingBook = await bookService.findOne({ _id: ObjectId(reqPayload._id) });
        if (!existingBook) {
            return res.status(204).json({
                message: "User Id doesn't exist!",
                status: 204
            })
        }
        
        // updating the data
        const filter = { _id: ObjectId(reqPayload._id) }
        // const payload = {status: reqPayload.status}
        const result = await langService.update(filter);
        res.status(201).send({
            message: "User updated successfully!",
            status: 201
        })
    }
    catch (error) {
        console.log('Caught Error', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}





const deleteUser = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.string().required()
    })
    const validateSchema = schema.validate(req.body);
    let reqPayload;
    // validating payload
    if (validateSchema.error) {
        return res.status(400).json({
            message: validateSchema.error.message || "Bad Request",
            code: 400
        })
    } else {
        reqPayload = validateSchema.value;
    }

    try {
        // validatinng for existing User
        const existingBook = await bookService.findOne({ _id: ObjectId(reqPayload._id) });
        if (!existingBook) {
            return res.status(204).json({
                message: "USer id doesn't exist!",
                status: 204
            })
        }

        // Delete  user
        const filter = { _id: ObjectId(reqPayload._id) }
        const result = await bookService.deleteOne(filter);
        res.status(201).send({
            message: "User deleted successfully!",
            status: 201
        })
    }
    catch (error) {
        console.log('Caught Error', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}






module.exports = {
    createUser,
    updateUser,
    deleteUser
}