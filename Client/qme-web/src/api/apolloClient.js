import { ApolloClient, InMemoryCache, HttpLink, split, gql } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const url = '147.139.175.155:4000'
// const url = 'localhost:4000'

const httpLink = new HttpLink({
  uri: `http://${url}`
});

const wsLink = new WebSocketLink({
  uri: `ws://${url}/graphql`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

export const LOGIN = gql`
  mutation Login($email:String, $password:String){
    login(email: $email, password:$password){
        status
        token
        role
        message
    }
  }
`

export const REGISTER = gql`
  mutation Register ($fullName:String, $username:String, $email:String, $password:String, $dob: String, $phoneNumber: String, $avatar: String, $role: String){
    register (fullName: $fullName,username: $username,email: $email,password: $password, dob: $dob, phoneNumber: $phoneNumber, avatar: $avatar, role: $role){
        status
        message
    }
  }
`

export const GETALLDATA = gql`
  query GetAllData ($token:String, $by:Int) {
    appointments (token: $token) {
      id
      patientName
      queueNumber
      status
      inQueue
      date
      User {
        fullName
        username
        email
        dob
        phoneNumber
        avatar
      }
      Doctor {
        name
        queueIndex
        description
        avatar
        availableAt
        policlinic
        maxCapacity
      }
      UserId
      DoctorId
    }
    doctors (by: $by) {
      id
      name
      queueIndex
      description
      avatar
      availableAt
      policlinic
      maxCapacity
    }
    user (token: $token) {
      id
      fullName
      username
      email
      dob
      phoneNumber
      avatar
      role
    }
  }
`


export const SUBSCRIBEAPPOINTMENT = gql`
  subscription SubcribeAppointment {
    newAppointment {
      status
      data {
        id
        patientName
        queueNumber
        status
        inQueue
        date
        User {
          fullName
          username
          email
          dob
          phoneNumber
          avatar
        }
        Doctor {
          name
          queueIndex
          description
          avatar
          availableAt
          policlinic
          maxCapacity
        }
        UserId
        DoctorId
      }
    }
  }
`

export const GETAPPOINTMENT = gql`
  query GetAppointments ($token:String) {
    appointments (token: $token) {
      id
      patientName
      queueNumber
      status
      inQueue
      date
      User {
        fullName
        username
        email
        dob
        phoneNumber
        avatar
      }
      Doctor {
        name
        queueIndex
        description
        avatar
        availableAt
        policlinic
        maxCapacity
      }
      UserId
      DoctorId
    }
  }
`
export const GETUSER = gql`
  query GetUser ($token:String) {
    user (token: $token) {
      id
      fullName
      username
      email
      dob
      phoneNumber
      avatar
      role
    }
  }
`

export const GETDOCTOR = gql`
  query GetDoctors ($by:Int) {
    doctors (by: $by) {
      id
      name
      queueIndex
      description
      avatar
      availableAt
      policlinic
      maxCapacity
    }
  }
`

export const GETDOCTORANDUSER = gql`
  query GetDoctorsAndUser ($token:String, $by:Int) {
    doctors (by: $by) {
      id
      name
      queueIndex
      description
      avatar
      availableAt
      policlinic
      maxCapacity
    }
    user (token: $token) {
      id
      fullName
      username
      email
      dob
      phoneNumber
      avatar
      role
    }
  }
`

export const GETAPPOINTMENTANDUSER = gql`
  query GetAppointmentsAndUser ($token:String) {
    appointments (token: $token) {
      id
      patientName
      queueNumber
      status
      inQueue
      date
      User {
        fullName
        username
        email
        dob
        phoneNumber
        avatar
      }
      Doctor {
        name
        queueIndex
        description
        avatar
        availableAt
        policlinic
        maxCapacity
      }
      UserId
      DoctorId
    }
    user (token: $token) {
      id
      fullName
      username
      email
      dob
      phoneNumber
      avatar
      role
    }
  }
`

export default client