import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function MonitorNav() {
    const history = useHistory()
    const [ time, setTime ] = useState('')
    const [ date, setDate ] = useState('')

    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push("/login")
    }

    function getDate() {
        const now = new Date()
        const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
        const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
        const day = days[ now.getDay() ]
        const today = now.getDate()
        const month = months[ now.getMonth() ]
        const year = now.getFullYear()

        return `${ day },   ${ today }   ${ month }   ${ year }`
    }

    useEffect(() => {
        setInterval(updateTime, 1000)
        function updateTime() {
            const newTime = new Date().toLocaleTimeString();
            setTime(newTime)
        }
        setDate(getDate())
    }, [])

    return (
        <>
            <div className="div-time container-fluid d-flex" style={ { justifyContent: 'space-between', color: '#838383' } }>
                <div className="div-left">
                    <p style={ { fontWeight: 'normal', paddingTop: '10px', fontSize: '20px', fontFamily: 'Merienda' } }>{ date }</p>
                </div>
                <div className="div-right d-flex" style={ { marginRight: '10px' } }>
                    <p style={ { fontFamily: 'Londrina Outline', fontSize: '35px', fontWeight: 'bolder' } }>{ time }</p>
                    <Link to="/login" style={ { marginTop: '17px' } }>
                        <p className="hover-logout" style={ { fontSize: "10px" } } onClick={(event) => {
                            event.preventDefault()
                            history.push("/admin")
                        }}>Home</p>
                    </Link>
                    <Link to="/login" style={ { marginTop: '17px' } }>
                        <p className="hover-logout" style={ { fontSize: "10px" } } onClick={logout}>Logout</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
