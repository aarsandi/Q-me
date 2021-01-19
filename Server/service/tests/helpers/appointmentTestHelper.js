const { Appointment } = require('../../models/index')

async function resetAppointmentDummy() {
    await Appointment.destroy({ where: { patientName: 'coba' } })
    await Appointment.update({ status: 'onProcess' }, { where: { id: 1 }})
    await Appointment.update({ inQueue: 0 }, { where: { id: 5 }})
}

module.exports = {
    resetAppointmentDummy
}