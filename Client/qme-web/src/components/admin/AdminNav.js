import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function AdminNav() {
    const history = useHistory();

    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push("/login")
    }

    return (
        <div className='container-fluid div-nav'>
            <div className="nav-left d-flex" >
                <Link to="/admin">
                    <p>Dashboard</p>
                </Link>
                <Link to="/admin/doctor" >
                    <p style={ { marginLeft: "30px" } }>Doctor List</p>
                </Link>
            </div>
            <div className="nav-right">
                <Link to="/login">
                    <p onClick={ logout } className="click">Logout</p>
                </Link>
            </div>
        </div>
    )
}
