import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function PatientNav({ dataUser }) {
    const history = useHistory();

    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
                <a className="navbar-brand click" onClick={(e) => { history.push("/patient") }}>Dashboard</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navb" className="navbar-collapse collapse hide">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link click" onClick={(e) => { history.push("/patient") }}>Home</a>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link click" onClick={(e) => { history.push("/patient/edit") }}> {dataUser.username}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link click" onClick={ logout }><span className="fas fa-sign-in-alt"></span> Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
