const { User, Doctor } = require('../models/index')
const { comparePassword, hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static login (req, res, next) {
        const inputPassword = req.body.password
        User.findOne({
            where: { email: req.body.email }
        }).then(user => {
            const databasePassword = user ? user.password : ''
            if (!user) {
                next({
                    name: 'BadRequest',
                    error: 'email not found'
                })
            } else if (!comparePassword(inputPassword, databasePassword)) {
                next ({
                    name: 'BadRequest',
                    error: 'invalid username/password'
                })
            } else {
                const payload = { email: user.email }
                const token = signToken(payload)
                res.status(200).json({ token: token, role: user.role, id: user.id })
            }
        })
    }

    static async register (req, res, next) {
        const { ...data } = req.body
        try {
            const user = await User.create(data)
            const payload = { email: user.email }
            const token = signToken(payload)
            res.status(201).json({
                token
            })
        } catch(err) {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: 'BadRequest',
                    error: err.errors[0].message
                })
            } else {
                next({
                    name: 'BadRequest',
                    error: err.errors[0].message
                })
            }
        }
    }

    static async addUser (req, res, next) {
        const { ...data } = req.body
        try {
            const user = await User.create(data)
            res.status(201).json({
                message: `success add user with ${user.email}`
            })
        } catch(err) {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: 'BadRequest',
                    error: err.errors[0].message
                })
            } else {
                next({
                    name: 'BadRequest',
                    error: err.errors[0].message
                })
            }
        }
    }

    static async editUser (req, res, next) {
        const { password, ...data } = req.body
        try {
            const user = await User.findByPk(req.params.id)
            if (user) {
                if (password) {
                    await user.update({ ...data, password: hashPassword(password)})
                    res.status(200).json({
                        message: `success edit ${user.email} data and password`
                    })
                } else {
                    await user.update(data)
                    res.status(200).json({
                        message: `success edit ${user.email} data`
                    })
                }
            } else {
                next({
                    name: 'NotFound',
                    error: 'user not found'
                })
            }
        } catch(err) {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: 'BadRequest',
                    error: err.errors[0].message
                })
            } else {
                next({
                    name: 'BadRequest',
                    error: err.errors[0].message
                })
            }
        }
    }

    static async readUserLoginData (req, res, next) {
        const user = req.userLogin
        res.status(200).json(user)
    }

    static async deleteUser(req, res, next) {
        const user = await User.findByPk(req.params.id)
        if(user) {
            user.destroy()
            res.status(200).json(user)
        } else {
            next({
                name: 'NotFound',
                error: 'user not found'
            })
        }
    }
}

module.exports = UserController