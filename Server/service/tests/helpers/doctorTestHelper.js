const { Doctor } = require('../../models/index')

async function deleteDoctorDummy() {
    await Doctor.destroy({ where: { name: 'test2' } })
}

module.exports = {
    deleteDoctorDummy
}