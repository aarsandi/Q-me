const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const AppointmentController = require('../controllers/AppointmentController')
const DoctorController = require('../controllers/DoctorController')
const { authentication, isAdmin, authorization } = require("../middlewares/auth")

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/user', authentication, UserController.readUserLoginData)
router.post('/user/add', authentication, isAdmin, UserController.addUser)
router.put('/user/edit/:id', authentication, authorization, UserController.editUser)
router.delete('/user/delete/:id', authentication, isAdmin, UserController.deleteUser)

router.get('/doctors/:by', DoctorController.browseDoctor)
router.post('/doctor/add', authentication, isAdmin, DoctorController.addDoctor)
router.put('/doctor/edit/:id', authentication, isAdmin, DoctorController.editDoctor)
router.delete('/doctor/delete/:id', authentication, isAdmin, DoctorController.deleteDoctor)

router.get('/appointments', authentication, AppointmentController.browseAllAppointment)
router.post('/appointment/add', authentication, AppointmentController.makeAppointment)
router.put('/appointment/changeStatus/:id', authentication, isAdmin, AppointmentController.changeStatus)
router.put('/appointment/setInQueue/:id', authentication, isAdmin, AppointmentController.setInQueue)
router.delete('/appointment/delete/:id', authentication, AppointmentController.deleteAppointment)

module.exports = router