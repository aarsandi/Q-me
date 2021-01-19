const { Appointment, Doctor, User } = require('../models/index')

class AppointmentController {
    static async browseAllAppointment (req, res, next) {
        const appointments = await Appointment.findAll({
            order: [['queueNumber', 'ASC']],
            include: [
                { model: User, attributes: ['fullName', 'username', 'email', 'phoneNumber', 'avatar']},
                { model: Doctor}
            ]
        })
        res.status(200).json(appointments)
    }

    static async makeAppointment (req, res, next) {
        try {
            const data = { ...req.body, status: "waiting", UserId: req.userLogin.id }
            const appointment = await Appointment.create(data)
            const result = await Appointment.findOne({
                where: { id: appointment.id },
                include: [
                    { model: User, attributes: ['fullName', 'username', 'email', 'phoneNumber', 'avatar']},
                    { model: Doctor}
                ]
            })
            res.status(201).json(result)
        } catch (err) {
            next({
                name: 'BadRequest',
                error: err.errors[0].message
            })
        }
    }

    static async changeStatus (req, res, next) {
        const appointment = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['fullName', 'username', 'email', 'phoneNumber', 'avatar']},
                { model: Doctor}
            ]
        })
        if(appointment) {
            if (appointment.inQueue == 0) {
                next({
                    name: 'BadRequest',
                    error: 'Appointment not in Queue, scan it first'
                })
            } else {
                await appointment.update({ status: req.body.status })
                res.status(200).json(appointment)
            }
        } else {
            next({
                name: 'NotFound',
                error: 'Appointment not found'
            })
        }
    }

    static async setInQueue (req, res, next) {
        const appointment = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['fullName', 'username', 'email', 'phoneNumber', 'avatar']},
                { model: Doctor}
            ]
        })
        if(appointment) {
            if (appointment.inQueue == 1) {
                next({
                    name: 'BadRequest',
                    error: 'Appointment already in Queue'
                })
            } else {
                await appointment.update({ inQueue: 1 })
                res.status(200).json(appointment)
            }
        } else {
            next({
                name: 'NotFound',
                error: 'Appointment not found'
            })
        }
    }

    static async deleteAppointment (req, res, next) {
        const appointment = await Appointment.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['fullName', 'username', 'email', 'phoneNumber', 'avatar']},
                { model: Doctor}
            ]
        })
        if(appointment) {
            appointment.destroy()
            res.status(200).json(appointment)
        } else {
            next({
                name: 'NotFound',
                error: 'Appointment not found'
            })
        }
    }
}

module.exports = AppointmentController