import React from 'react'

export default function QueueCard({ data }) {
    return (
        <div className="card card-antrian d-flex">
            <h1>{data.status === 'waiting' ? 'next' : 'on process'}</h1>
            <div className="card-body">
                <div className="div-antrian_title">
                <p>{data.patientName}</p>
                </div>
                <div className="div-antrian_number">
                        <h1>{data.Doctor.queueIndex} {data.queueNumber}</h1>
                </div>
                <div className="div-antrian_poli">
                <p className="card-title">{data.Doctor.policlinic} Poli Clinic</p>
                </div>
            </div>
        </div>
    )
}
