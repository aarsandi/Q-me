import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function SiteNav({ dataUser }) {
    const history = useHistory();

    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push("/login")
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light site-navbar-target" id="ftco-navbar">
            <div className="container">
                <a className="navbar-brand pointer" onClick={ (e) => { history.push("/") } }>Q-Me</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav nav ml-auto">
                        <li className="nav-item pointer"><a onClick={(e) => { history.push("/") }} className="nav-link"><span>Home</span></a></li>
                        <li className="nav-item pointer"><a onClick={(e) => { history.push("/doctors") }} className="nav-link"><span>Doctors</span></a></li>
                        <li className="nav-item pointer"><a onClick={(e) => { history.push("/doctors") }} className="nav-link"><span>User</span></a></li>
                        <li className="nav-item pointer cta mr-md-2"><a href="appointment.html" className="nav-link">Login</a></li>
                        <li className="nav-item pointer cta mr-md-2"><a href="appointment.html" className="nav-link">Register</a></li>
                        <li className="nav-item pointer cta mr-md-2"><a href="appointment.html" className="nav-link">Logout</a></li>
                        {/* { dataUser ? 
                            <>
                                { dataUser === 'admin' ?
                                    <p className="mb-0 register-link"><a onClick={ (e) => { history.push("/admin") } } className="mr-3">Dashboard</a><a onClick={ logout } className="mr-3">Logout</a></p>:
                                    <p className="mb-0 register-link"><a onClick={ (e) => { history.push("/patient") } } className="mr-3">Dashboard</a><a onClick={ logout } className="mr-3">Logout</a></p>
                                }
                            </> :
                            <>
                                <p className="mb-0 register-link"><a onClick={(e) => { history.push("/login") }} className="mr-3">Login</a></p>
                            </>
                        } */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
