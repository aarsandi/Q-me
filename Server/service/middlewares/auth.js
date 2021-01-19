const { User } = require('../models/index') 
const { verifyToken } = require('../helpers/jwt')
const { checkDataUser } = require('../helpers/authorHelper')

async function authentication(req, res, next) {
    const token = req.headers.token
    if (!token) {
        res.status(401).json({ error: 'please login first' })
    } else {
        try {
            const payload = verifyToken(token)
            const user = await User.findOne({
                where: {email: payload.email}
            })
            if (!user) {
                res.status(401).json({ error: 'please login first' })
            } else {
                req.userLogin = user
                next()
            }
        } catch (err) {
            res.status(401).json({ error: 'token is not define please relogin' })
        }
    }
}

function authorization(req, res, next) {
    if (req.userLogin.role === "admin") {
        next()
    } else {
        const checkId = checkDataUser(req.userLogin.id ,req.params.id)
        if (checkId === 'error') {
            res.status(401).json({error: 'you can not access this request, please login as admin or login as owner data'});
        } else {
            next()
        }
    }
}

function isAdmin(req, res, next) {
    if (req.userLogin.role === "admin") {
        next()
    } else {
        res.status(401).json({error: 'please login as admin'});
    }
}

module.exports = {
    authentication,
    isAdmin,
    authorization
}