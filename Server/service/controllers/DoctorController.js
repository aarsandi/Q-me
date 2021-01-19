const { Doctor } = require('../models/index')

class DoctorController {    
    static async browseDoctor (req, res, next) {
        const doctors = await Doctor.findAll()
        if (req.params.by >= 0 && req.params.by <= 6) {
            let result = []
            doctors.forEach(doctor => {
                let day = JSON.parse(doctor.availableAt)
                day.forEach(data => {
                    if (data.id == req.params.by) {
                        result.push(doctor)
                    }
                })
            });
            res.status(200).json(result)
        } else {
            res.status(200).json(doctors)
        }
    }

    static async addDoctor (req, res, next) {
        const { ...data } = req.body
        try {
            const doctor = await Doctor.create(data)
            res.status(201).json({
                message: `success add dr ${doctor.name} to database`
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

    static async editDoctor (req, res, next) {
        const { ...data } = req.body
        try {
            const doctor = await Doctor.findByPk(req.params.id)
            if (doctor) {
                await doctor.update(data)
                res.status(200).json({
                    message: `success edit dr ${doctor.name} data`
                })
            } else {
                next({
                    name: 'NotFound',
                    error: 'doctor not found'
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

    static async deleteDoctor (req, res, next) {
        const doctor = await Doctor.findByPk(req.params.id)
        if (doctor) {
            await doctor.destroy()
            res.status(200).json({
                message: `success delete dr ${doctor.name} data`
            })
        } else {
            next({
                name: 'NotFound',
                error: 'doctor not found'
            })
        }
    }
}

module.exports = DoctorController