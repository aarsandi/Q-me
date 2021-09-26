import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../api/apolloClient'

export default function Register() {
    const history = useHistory()
    const [ fullName, setFullName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ error, setError ] = useState('')
    const [ onLoading, setOnLoading ] = useState(false)

    const [ registerUser ] = useMutation(REGISTER)
    
    function submitRegister(event) {
        event.preventDefault()
        setOnLoading(true)
        if (fullName == '' || username == '' || email == '' || password == '' || phoneNumber == '') {
            setError('Any field cannot be empty!')
            setOnLoading(false)
        } else if (phoneNumber.length < 11) {
            setError('Phone Number must be 12 number')
            setOnLoading(false)
        } else {
            let phone = null
            const firstNumber = phoneNumber.slice(0, 2)
            if (phoneNumber[ 0 ] === '0') {
                phone = '62' + phoneNumber.slice(1, phoneNumber.length)
            } else if(firstNumber === '62') {
                phone = phoneNumber
            } else {
                phone = '62' + phoneNumber
            }
            registerUser({
                variables: {
                    fullName: fullName,
                    username: username,
                    email: email,
                    password: password,
                    dob: null, phoneNumber: phone, avatar: 'default', role: 'patient'
                }
            }).then((res) => {
                if (res.data) {
                    if (res.data.register.status === 'success') {
                        setError('')
                        setOnLoading(false)
                        history.push('/login')
                    } else {
                        setError(res.data.register.message)
                        setOnLoading(false)
                    }
                } else {
                    setError("error 500")
                    setOnLoading(false)
                }
            }).catch((err) => {
                setError("error 500")
                setOnLoading(false)
            })
        }
    }
    return (
        <div className='container-fluid'>
            <form onSubmit={ submitRegister }>
                <div className="form-group">
                    <label>FullName</label>
                    <input onChange={ (event) => setFullName(event.target.value) } type="text" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>username</label>
                    <input onChange={ (event) => setUsername(event.target.value) } type="text" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>email</label>
                    <input onChange={ (event) => setEmail(event.target.value) } type="email" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input onChange={ (event) => setPassword(event.target.value) } type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input onChange={ (event) => setPhoneNumber(event.target.value) } type="number" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                {
                    onLoading ?
                    <p style={ { color: "red", marginTop: "20px" } }>loading.....</p>:
                    <button style={ { backgroundColor: '#86c4ba', color: '#ffa34d ', outline: 'none', borderColor: '#86c4ba' } } type="submit" className="btn btn-primary">Register</button>
                }
            </form>
            {
                error &&
                <p style={ { color: "red", marginTop: "20px" } }>{ error }</p>
            }
        </div>
    )
}
