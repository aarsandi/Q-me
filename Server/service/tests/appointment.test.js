const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { resetAppointmentDummy } = require('./helpers/appointmentTestHelper')

const adminUserToken = signToken({ email: 'admin@mail.com' })
const patientUserToken = signToken({ email: 'user1@mail.com' })
afterAll(resetAppointmentDummy)

describe('Browse Appointment Route Tests', function() {
    test('success route',function(done) {
        request(app)
        .get('/appointments')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            done()
        })
    })
    test('error if token empty route',function(done) {
        request(app)
        .get('/appointments')
        .set({'token': ''})
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'please login first')
            done()
        })
    })
    test('error if user token not found',function(done) {
        request(app)
        .get('/appointments')
        .set({'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvbG9sb2xvbG9sb0BtYWlsLmNvbSIsImlhdCI6MTYxMDY4MTg1N30.d9Pm_Y8InZEj7pLZMSdupXqSBhQY-LnEzzVerOtt2gg'})
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'please login first')
            done()
        })
    })
    test('error if user token not define',function(done) {
        request(app)
        .get('/appointments')
        .set({'token': 'eyJhbGciOiJIUzI1NiIsIwfrrrsfedeadwadlpefoefkeyJlbWFpbCI6ImxvdwdwdwdsadwbG9sb2xvbG9sb0BtYWlsLmNvbSIsImlhdCI6MTYxMDY1OTMyMn0.oYIp0ReNpDoY9Rk8uXkJB7txC1MfgLzpjHWSxGFNCuI'})
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'token is not define please relogin')
            done()
        })
    })
})

describe('Add Appointment Route Tests', function() {
    test('success route', function(done) {
        request(app)
        .post('/appointment/add')
        .set({'token': adminUserToken})
        .send({
            patientName:'coba',
            queueNumber: '10',
            date: '12-12-2020',
            DoctorId: 2,
            inQueue: 1
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('patientName')
            expect(res.body).toHaveProperty('queueNumber')
            expect(res.body).toHaveProperty('status')
            done()
        })
    })
    test('error with one of field empty', function(done) {
        request(app)
        .post('/appointment/add')
        .set({'token': adminUserToken})
        .send({
            patientName:'',
            queueNumber: '10',
            date: '12-12-2020',
            DoctorId: 2,
            inQueue: 1
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'fill in the patient name field')
            done()
        })
    })
})

describe('Change Status Appointment Route Tests', function() {
    test('success route', function(done) {
        request(app)
        .put('/appointment/changeStatus/1')
        .set({'token': adminUserToken})
        .send({
            status: 'done'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('patientName')
            expect(res.body).toHaveProperty('status')
            done()
        })
    })
    test('error if not admin route', function(done) {
        request(app)
        .put('/appointment/changeStatus/1')
        .set({'token': patientUserToken})
        .send({
            status: 'done'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'please login as admin')
            done()
        })
    })
    test('error appointment not in queue', function(done) {
        request(app)
        .put('/appointment/changeStatus/5')
        .set({'token': adminUserToken})
        .send({
            status: 'onProcess'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', `Appointment not in Queue, scan it first`)
            done()
        })
    })
    test('error not found', function(done) {
        request(app)
        .put('/appointment/changeStatus/200')
        .set({'token': adminUserToken})
        .send({
            status: 'onProcess'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', `Appointment not found`)
            done()
        })
    })
})

describe('Set Appointment to in Queue Route Tests', function() {
    test('success route', function(done) {
        request(app)
        .put('/appointment/setInQueue/5')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('patientName')
            expect(res.body).toHaveProperty('inQueue')
            done()
        })
    })
    test('error appointment already in queue', function(done) {
        request(app)
        .put('/appointment/setInQueue/1')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', `Appointment already in Queue`)
            done()
        })
    })
    test('error not found', function(done) {
        request(app)
        .put('/appointment/setInQueue/200')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', `Appointment not found`)
            done()
        })
    })
})

describe('Delete Appointment Tests', function() {
    test('success route', function(done) {
        request(app)
        .delete(`/appointment/delete/1`)
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('id')
            done()
        })
    })
    test('error Doctor not found', function(done) {
        request(app)
        .delete('/appointment/delete/110')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'Appointment not found')
            done()
        })
    })
})
