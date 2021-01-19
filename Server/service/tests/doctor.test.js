const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { deleteDoctorDummy } = require('./helpers/doctorTestHelper')
const adminUserToken = signToken({ email: 'admin@mail.com' })

afterAll(deleteDoctorDummy)

describe('Browse Doctor Route Tests', function() {
    test('success all doctor route',function(done) {
        request(app)
        .get('/doctors/7')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            done()
        })
    })
    test('success by day doctor route',function(done) {
        request(app)
        .get('/doctors/1')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            done()
        })
    })
})

describe('Add Doctor Route Tests', function() {
    test('success route', function(done) {
        request(app)
        .post('/doctor/add')
        .set({'token': adminUserToken})
        .send({
            name:'test2',
            queueIndex: 'TD',
            description:'test2',
            avatar: 'test2',
            availableAt: '[2,3]',
            policlinic: "Umum",
            maxCapacity: 20
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message', `success add dr test2 to database`)
            done()
        })
    })
    test('error with one of field empty', function(done) {
        request(app)
        .post('/doctor/add')
        .set({'token': adminUserToken})
        .send({
            name:'',
            queueIndex: 'TD',
            description:'test2',
            avatar: 'test2',
            availableAt: '[2,3]',
            policlinic: "Umum",
            maxCapacity: 20
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'fill in the Doctor name field')
            done()
        })
    })
    test('error if input is existed data', function(done) {
        request(app)
        .post('/doctor/add')
        .set({'token': adminUserToken})
        .send({
            name:'wddwdwdwdw',
            queueIndex: 'GJ',
            description:'test2',
            avatar: 'test2',
            availableAt: '[2,3]',
            policlinic: "Umum",
            maxCapacity: 20
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'queueIndex already exists')
            done()
        })
    })
})

describe('Edit Doctor Route Tests', function() {
    test('success route', function(done) {
        request(app)
        .put('/doctor/edit/3')
        .set({'token': adminUserToken})
        .send({
            name: 'dwwdwdw',
            queueIndex: 'DW',
            description:'dwwdwdw',
            avatar:'dwwdwdw',
            availableAt: '[]',
            policlinic: 'Umum',
            maxCapacity: 20
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message', `success edit dr dwwdwdw data`)
            done()
        })
    })
    test('error with one of field empty', function(done) {
        request(app)
        .put('/doctor/edit/3')
        .set({'token': adminUserToken})
        .send({
            name: '',
            queueIndex: 'DW',
            description:'dwwdwdw',
            avatar:'dwwdwdw',
            availableAt: '[]',
            policlinic: 'Umum',
            maxCapacity: 20
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'fill in the Doctor name field')
            done()
        })
    })
    test('error data not found', function(done) {
        request(app)
        .put('/doctor/edit/100')
        .set({'token': adminUserToken})
        .send({
            name: '',
            queueIndex: 'DW',
            description:'dwwdwdw',
            avatar:'dwwdwdw',
            availableAt: '[]',
            policlinic: 'Umum',
            maxCapacity: 20
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'doctor not found')
            done()
        })
    })
    test('error if input is existed data', function(done) {
        request(app)
        .put('/doctor/edit/3')
        .set({'token': adminUserToken})
        .send({
            name: 'dwdwdwd',
            queueIndex: 'GJ',
            description:'dwwdwdw',
            avatar:'dwwdwdw',
            availableAt: '[]',
            policlinic: 'Umum',
            maxCapacity: 20
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'queueIndex already exists')
            done()
        })
    })
})

describe('Delete Doctor Tests', function() {
    test('success route', function(done) {
        request(app)
        .delete('/doctor/delete/1')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message', 'success delete dr Alya data')
            done()
        })
    })
    test('error Doctor not found', function(done) {
        request(app)
        .delete('/doctor/delete/100')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'doctor not found')
            done()
        })
    })
})
