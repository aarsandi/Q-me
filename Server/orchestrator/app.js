const { ApolloServer, gql, PubSub } = require('apollo-server')
const axios = require('axios')

// Service url
const service = 'http://147.139.175.155:3001'
// const service = 'http://localhost:3001'

// for subcription realtime stuff
const pubsub = new PubSub();
const NEW_APPOINTMENT = "NEW_APPOINTMENT"

const typeDefs = gql`
    type User {
        id: Int
        fullName: String
        username: String
        email: String
        dob: String
        phoneNumber: String
        avatar: String
        role: String
    }

    type Doctor {
        id: Int
        name: String
        queueIndex: String
        description : String
        avatar : String
        availableAt : String
        policlinic: String
        maxCapacity: Int
    }

    type Appointment {
        id: Int
        patientName: String
        queueNumber: Int
        status: String
        inQueue: Int
        date: String
        User: User
        Doctor: Doctor
		UserId: Int
		DoctorId: Int
    }

    type LoginResponse {
        status: String
        token: String
		id: Int
        role: String
        message: String
    }

    type Response {
        status: String
        message: String
    }

    type ResponseSubcription {
        status: String
        data: Appointment
    }

    type Query {
        appointments(token: String): [Appointment]
        doctors(by: Int): [Doctor]
        user(token: String, id: Int): User
    }

    type Mutation {
        login(email: String, password: String): LoginResponse
        register(username: String, fullName: String, email: String, password: String, dob: String, phoneNumber: String, avatar: String, role: String): Response
        addUser(token: String, username: String, fullName: String, email: String, password: String, dob: String, phoneNumber: String, avatar: String, role: String): Response
        editUser(token: String, id: Int, username: String, fullName: String, email: String, password: String, dob: String, phoneNumber: String, avatar: String, role: String): Response
        deleteUser(token: String, id: Int): Response
        makeAppointment(token: String, patientName: String, queueNumber: Int, date: String, inQueue: Int, DoctorId: Int): Response
        deleteAppointment(token: String, id: Int): Response
        changeStatus(token: String, id: Int, status: String): Response
        setInQueue(token: String, id: Int): Response
        addDoctor(token: String, name: String, queueIndex: String, description: String, avatar: String, availableAt: String, policlinic: String, maxCapacity: Int): Response
        editDoctor(token: String, id: Int, name: String, queueIndex: String, description: String, avatar: String, availableAt: String, policlinic: String, maxCapacity: Int): Response
        deleteDoctor(token: String, id: Int): Response
    }

    type Subscription {
        newAppointment: ResponseSubcription
    }
`

const resolvers = {
    // Subcription stuff
    Subscription: {
        newAppointment: {
            subscribe: () => {
                return pubsub.asyncIterator([ NEW_APPOINTMENT ]);
            },
        }
    },

    Query: {
        async appointments(parent, args) {
            const {data} = await axios.get(`${service}/appointments`, {
                headers: {
                    token: args.token,
                },
            })
            return data
        },
        async doctors(parent, args) {
            const {data} = await axios.get(`${service}/doctors/${args.by}`)
            return data
        },
        async user(parent, args) {
            const {data} = await axios.get(`${service}/user`, {
                headers: {
                    token: args.token,
                },
            })
            return data
        }
    },

    Mutation: {
        async login(parent, args) {
            try {
                const { email, password } = args;
                const { data } = await axios.post(`${service}/login`, {
                    email,
                    password,
                })
                return {
                    status: 'success',
					id: data.id,
                    role: data.role,
                    token: data.token
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async register(parent, args) {
            try {
                const { username, fullName, email, password, dob, phoneNumber, avatar, role } = args;
                await axios.post(`${service}/register`, {
                    username, fullName, email, password, dob, phoneNumber, avatar, role
                })
                if (role === "admin") {
                    return {
                        status: 'success',
                        message : `success register admin account with ${email}`
                    }
                } else {
                    return {
                        status: 'success',
                        message : `success register action with ${email}`
                    }
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async addUser(parent, args) {
            try {
                const { token, username, fullName, email, password, dob, phoneNumber, avatar, role } = args;
                const result = await axios({
                    method: 'post',
                    url: `${service}/user/add`,
                    headers: {
                        token: token,
                    },
                    data: {
                        username, fullName, email, password, dob, phoneNumber, avatar, role
                    }
                })
                return {
                    status: 'success',
                    message : result.data.message
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async editUser (parent, args) {
            try {
                const { token, id, username, fullName, email, password, dob, phoneNumber, avatar, role } = args;
                const result = await axios({
                    method: 'put',
                    url: `${service}/user/edit/${id}`,
                    headers: {
                        token: token,
                    },
                    data: {
                        username, fullName, email, password, dob, phoneNumber, avatar, role
                    }
                })
                return {
                    status: 'success',
                    message : result.data.message
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async deleteUser (parent, args) {
            try {
                const { token, id } = args;
                await axios({
                    method: 'delete',
                    url: `${service}/user/delete/${id}`,
                    headers: {
                        token: token,
                    }
                })
                return {
                    status: 'success',
                    message : `success delete user with id: ${id}`
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async makeAppointment(parent, args) {
            try {
                const { token, patientName, queueNumber, date, inQueue, DoctorId } = args;
                const { data } = await axios({
                    method: 'post',
                    url: `${service}/appointment/add`,
                    headers: {
                        token: token,
                    },
                    data: {
                        patientName, queueNumber, date, inQueue, DoctorId
                    }
                })
                // subcription
                pubsub.publish(NEW_APPOINTMENT, { newAppointment: { status: 'added', data: data } });
                return {
                    status: 'success',
                    message : `your queue number is ${queueNumber}`
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async deleteAppointment(parent, args) {
            try {
                const { token, id } = args;
                const { data } = await axios({
                    method: 'delete',
                    url: `${service}/appointment/delete/${id}`,
                    headers: {
                        token: token,
                    }
                })
                // subcription
                pubsub.publish(NEW_APPOINTMENT, { newAppointment: { status: 'deleted', data: data } });
                return {
                    status: 'success',
                    message : `success delete appointment ${id}`
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async changeStatus(parent, args) {
            try {
                const { token, id, status } = args;
                const { data } = await axios({
                    method: 'put',
                    url: `${service}/appointment/changeStatus/${id}`,
                    headers: {
                        token: token,
                    },
                    data: {
                        status
                    }
                })
                // subcription
                pubsub.publish(NEW_APPOINTMENT, { newAppointment: { status: 'edited', data: data } });
                return {
                    status: 'success',
                    message : `success change to ${status}`
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async setInQueue(parent, args) {
            try {
                const { token, id } = args;
                const { data } = await axios({
                    method: 'put',
                    url: `${service}/appointment/setInQueue/${id}`,
                    headers: {
                        token: token,
                    }
                })
                // subcription
                pubsub.publish(NEW_APPOINTMENT, { newAppointment: { status: 'edited', data: data } });
                return {
                    status: 'success',
                    message : 'success action'
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async addDoctor(parent, args) {
            try {
                const { token, name, queueIndex, description, avatar, availableAt, policlinic, maxCapacity } = args;
                await axios({
                    method: 'post',
                    url: `${service}/doctor/add`,
                    headers: {
                        token: token,
                    },
                    data: {
                        name, queueIndex, description, avatar, availableAt, policlinic, maxCapacity
                    }
                })
                return {
                    status: 'success',
                    message : `success add dr ${name} to database`
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async editDoctor (parent, args) {
            try {
                const { token, id, name, queueIndex, description, avatar, availableAt, policlinic, maxCapacity } = args;
                await axios({
                    method: 'put',
                    url: `${service}/doctor/edit/${id}`,
                    headers: {
                        token: token,
                    },
                    data: {
                        name, queueIndex, description, avatar, availableAt, policlinic, maxCapacity
                    }
                })
                return {
                    status: 'success',
                    message : `success edit dr ${name} data`
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        },
        async deleteDoctor (parent, args) {
            try {
                const { token, id } = args;
                const result = await axios({
                    method: 'delete',
                    url: `${service}/doctor/delete/${id}`,
                    headers: {
                        token: token,
                    }
                })
                return {
                    status: 'success',
                    message : result.data.message
                }
            } catch (err) {
                return {
                    status: 'error',
                    message : err.response.data.error
                }
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true })

server.listen({ port: 4000 }).then(({url, subscriptionsUrl}) => {
    console.log(`Qme Orchestrator Server ready at port:4000`)
    console.log(`Qme Orchestrator Subcription ready at port:4000/graphql`)
})