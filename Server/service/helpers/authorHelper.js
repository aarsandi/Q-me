function checkDataUser(userLoginId ,inputId) {
    if (userLoginId == inputId) {
        return 'next'
    } else {
        return 'error'
    }
}

module.exports = {
    checkDataUser
}