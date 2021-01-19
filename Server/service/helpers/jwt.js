const jwt = require('jsonwebtoken')

function signToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}
function verifyToken(token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    return payload
}

module.exports = {
    signToken,
    verifyToken
}