import React, { useState } from 'react'
import loginicon from '../assets/loginicon.png'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../api/apolloClient'

export default function Login() {
    const history = useHistory()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [ login ] = useMutation(LOGIN)
    
    async function handleLogin(event) {
        event.preventDefault()
        const { data } = await login({
            variables: {
                email: email,
                password: password
            }
        })
        if (data) {
            if (data.login.status === 'success') {
                if (data.login.role === 'admin') {
                    setError(null)
                    localStorage.setItem("token", data.login.token)
                    history.push('/admin')
                } else {
                    setError(null)
                    localStorage.setItem("token", data.login.token)
                    history.push('/patient')
                }
            } else {
                setError(data.login.message)
            }
        } else {
            setError("error 500")
        }
    }

    return (
        <div className='div-login container-fluid'>
            <div className="image-login">
                <img src={ loginicon } alt="Login Admin" style={ { width: '100px', height: '100px', margin: 'auto' } }></img>
            </div>

            <form onSubmit={ handleLogin }>
                <div className="form-group">
                <label />
                    <input onChange={ (event) => setEmail(event.target.value) } type="email" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
                </div>
                <div className="form-group">
                <label />
                    <input onChange={ (event) => setPassword(event.target.value) } type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label" style={ { fontSize: '10px', color: '#e66767' } }>dont have account<a className="btn" onClick={(e) => history.push('/register')}>register</a></label>
                </div>
                <button style={ { backgroundColor: '#86c4ba', color: '#ffa34d ', outline: 'none', borderColor: '#86c4ba' } } type="submit" className="btn btn-primary">Login</button>
            </form>
            {
                error &&
                <p style={ { color: "red", marginTop: "20px" } }>{ error }</p>
            }
        </div>
    )
}
