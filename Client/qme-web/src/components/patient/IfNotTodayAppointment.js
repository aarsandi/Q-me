import React from 'react'
import timeSince from '../../helpers/timeSince'

export default function IfNotTodayAppointment({ myAppointment, cancel }) {
    return (
        <div class="card">
            <div class="card-body">
                <h1>Your appointment</h1>
                <h1>{myAppointment.Doctor.policlinic} polyclinic</h1>
                <h1>Your Number : {myAppointment.Doctor.queueIndex} {myAppointment.queueNumber}</h1>
                <h1>Dr. {myAppointment.Doctor.name}</h1>
                <h1>Starts at {timeSince(myAppointment.date)}</h1>
                <button className="btn btn-danger" onClick={(event) => {
                    event.preventDefault()
                    cancel(myAppointment.id)
                }}>cancel</button>
            </div>
        </div>
    )
}
