const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { resetUserDummy } = require('./helpers/userTestHelper')
const adminUserToken = signToken({ email: 'admin@mail.com' })
const patient1UserToken = signToken({ email: 'user3@mail.com' })
const patient2UserToken = signToken({ email: 'user4@mail.com' })

afterAll(resetUserDummy)

describe('Login Route Tests', function() {
    test('success route',function(done) {
        request(app)
        .post('/login')
        .send({
            email:'admin@mail.com',
            password:'password'
        })
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('role')
            expect(res.body).toHaveProperty('id')
            done()
        })
    })
    test('error not found route',function(done) {
        request(app)
        .post('/login')
        .send({
            email:'cobaapaajyanggaada@mail.com',
            password:'password'
        })
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'email not found')
            done()
        })
    })
    test('error password not match route',function(done) {
        request(app)
        .post('/login')
        .send({
            email:'admin@mail.com',
            password:'passworddadada'
        })
        .end(function(err, res) {
            if (err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'invalid username/password')
            done()
        })
    })
})

describe('Register Route Tests', function() {
    test('success route', function(done) {
        request(app)
        .post('/register')
        .send({
            username:'test',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            done()
        })
    })
    test('error with username empty route', function(done) {
        request(app)
        .post('/register')
        .send({
            username:'',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'fill in the Username field')
            done()
        })
    })
    test('error if input is existed data', function(done) {
        request(app)
        .post('/register')
        .send({
            username:'user1',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'Username already exists')
            done()
        })
    })
})

describe('Add User Route Tests', function() {
    test('success route', function(done) {
        request(app)
        .post('/user/add')
        .set({'token': adminUserToken})
        .send({
            username:'test2',
            fullName: 'test2aja',
            email:'test2@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message', `success add user with test2@mail.com`)
            done()
        })
    })
    test('error with invalid token', function(done) {
        request(app)
        .post('/user/add')
        .set({'token': 'dadkfepofkroijoiusjfpiekpkae'})
        .send({
            username:'test2',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'token is not define please relogin')
            done()
        })
    })
    test('error with username empty', function(done) {
        request(app)
        .post('/user/add')
        .set({'token': adminUserToken})
        .send({
            username:'',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'fill in the Username field')
            done()
        })
    })
    test('error if input is existed data', function(done) {
        request(app)
        .post('/user/add')
        .set({'token': adminUserToken})
        .send({
            username:'user1',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'Username already exists')
            done()
        })
    })
})

describe('Edit User Route Tests', function() {
    test('success route with patient user', function(done) {
        request(app)
        .put('/user/edit/4')
        .set({'token': patient1UserToken})
        .send({
            username:'user3editeddd',
            fullName: 'user3',
            email: 'user3editedddd@mail.com',
            password: 'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message', `success edit user3editedddd@mail.com data and password`)
            done()
        })
    })
    test('success route with admin user', function(done) {
        request(app)
        .put('/user/edit/4')
        .set({'token': adminUserToken})
        .send({
            username:'user3editeddd',
            fullName: 'user3',
            email: 'user3editedddd@mail.com',
            password: 'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message', `success edit user3editedddd@mail.com data and password`)
            done()
        })
    })
    test('success route with admin user without change password', function(done) {
        request(app)
        .put('/user/edit/4')
        .set({'token': adminUserToken})
        .send({
            username:'user3editeddd',
            fullName: 'user3',
            email: 'user3editedddd@mail.com',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message', `success edit user3editedddd@mail.com data`)
            done()
        })
    })
    test('user not found', function(done) {
        request(app)
        .put('/user/edit/400')
        .set({'token': adminUserToken})
        .send({
            username:'user3editeddd',
            fullName: 'user3',
            email: 'user3editedddd@mail.com',
            password: 'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', `user not found`)
            done()
        })
    })
    test('error if user not authorized route', function(done) {
        request(app)
        .put('/user/edit/2')
        .set({'token': patient2UserToken})
        .send({
            username:'user3editeddd',
            fullName: 'user3',
            email: 'user3editedddd@mail.com',
            password: 'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', `you can not access this request, please login as admin or login as owner data`)
            done()
        })
    })
    test('error with invalid token', function(done) {
        request(app)
        .put('/user/edit/4')
        .set({'token': 'dadkfepofkroijoiusjfpiekpkae'})
        .send({
            username:'test2',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'token is not define please relogin')
            done()
        })
    })
    test('error with username empty', function(done) {
        request(app)
        .put('/user/edit/4')
        .set({'token': adminUserToken})
        .send({
            username:'',
            fullName: 'testaja',
            email:'test@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'fill in the Username field')
            done()
        })
    })
    test('error if input is existed data', function(done) {
        request(app)
        .put('/user/edit/4')
        .set({'token': adminUserToken})
        .send({
            username:'user1',
            fullName: 'testaja',
            email:'user1@mail.com',
            password:'password',
            dob: '1-1-2000',
            phoneNumber: '089834984934',
            avatar: 'coba',
            role: 'patient'
        })
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'Username already exists')
            done()
        })
    })
})

describe('Read User Login Tests', function() {
    test('success route', function(done) {
        request(app)
        .get('/user')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('fullName')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('avatar')
            expect(res.body).toHaveProperty('role')
            done()
        })
    })
    test('error with invalid token', function(done) {
        request(app)
        .get('/user')
        .set({'token': 'dadkfepofkroijoiusjfpiekpkae'})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'token is not define please relogin')
            done()
        })
    })
})

describe('Delete User Tests', function() {
    test('success route', function(done) {
        request(app)
        .delete('/user/delete/4')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('id')
            done()
        })
    })
    test('error user not found', function(done) {
        request(app)
        .delete('/user/delete/100')
        .set({'token': adminUserToken})
        .end(function(err, res) {
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('error', 'user not found')
            done()
        })
    })
})
