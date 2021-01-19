const { User } = require('../../models/index')

async function resetUserDummy() {
    await User.destroy({ where: { username: ['test', 'test2'] } })
}

module.exports = {
    resetUserDummy
}