import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../api/apolloClient'

export default function AdminRegister() {
    const history = useHistory()
    const [ fullName, setFullName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const [ onLoading, setOnLoading ] = useState(false)

    const [ registerUser ] = useMutation(REGISTER)
    
    function submitRegister(event) {
        event.preventDefault()
        setOnLoading(true)
        if (fullName == '' || username == '' || email == '' || password == '') {
            setError('Any field cannot be empty!')
            setOnLoading(false)
        } else {
            registerUser({
                variables: {
                    fullName: fullName,
                    username: username,
                    email: email,
                    password: password,
                    dob: null, phoneNumber: null, avatar: 'adminDefault', role: 'admin'
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
