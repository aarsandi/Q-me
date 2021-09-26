import React from 'react'

export default function IfOnProcessAppointment({ myAppointment }) {
    return (
        <div class="card">
            <div class="card-body">
                <h1>Hello, {myAppointment.patientName} !</h1>
                <h1>Thank you for waiting</h1>
                <h1>It's your turn now</h1>
                <h1>Please enter room {myAppointment.Doctor.queueIndex}</h1>
                <h1>for {myAppointment.Doctor.policlinic} polyclinic</h1>
                <h1>Get well soon :)</h1>
                <h1>Good luck</h1>
            </div>
        </div>
    )
}
