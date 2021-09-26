import React from 'react'
import { QRCode } from "react-qr-svg";

export default function IfWaitingAppointment({ myAppointment, onProcessAppointment, waitingAppointments, cancel }) {
    const qrdata = { id: myAppointment.id, inQueue: myAppointment.inQueue }
    return (
        <div className="row">
            { !myAppointment.inQueue && 
				<>
					{
						waitingAppointments.length >= myAppointment.Doctor.maxCapacity ?
						<div className="col-12">
							<h1 style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>You can't join our queue right now</h1>
							<h1 style={ { fontSize: 17, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>our queue capacity is reach at maximum number</h1>
							<h1 style={ { fontSize: 17, fontWeight: 'bold', alignSelf: 'center', color: "#e66767" } }>Please wait until capacity queue is availabe</h1>
						</div>:
						<div className="col-12">
							<h1 style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>our queue is availabe, you can enter the hospital</h1>
							<h1 style={ { fontSize: 17, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>and scan this QR Code</h1>
							<h1 style={ { fontSize: 17, fontWeight: 'bold', alignSelf: 'center', color: "#e66767" } }>with our staff at the hospital</h1>
							<QRCode
								bgColor="#FFFFFF"
								fgColor="#000000"
								level="Q"
								style={{ width: 256, marginBottom: '10px' }}
								value={JSON.stringify(qrdata)}
							/>
						</div>
					}
				</>
            }
            <div class="col-6 card">
                <div class="card-body">
                    <h1>Your Queue</h1>
                    <h1>{myAppointment.Doctor.policlinic} polyclinic</h1>
                    <h1>Your Number : {myAppointment.Doctor.queueIndex} {myAppointment.queueNumber}</h1>
                    <h1>Dr. {myAppointment.Doctor.name}</h1>
                </div>
            </div>
            { onProcessAppointment &&
                <div class="col-6 card">
                    <div class="card-body">
                        <h1>Current Queue</h1>
                        <h1>{onProcessAppointment.Doctor.policlinic} polyclinic</h1>
                        <h1>Your Number : {onProcessAppointment.Doctor.queueIndex} {onProcessAppointment.queueNumber}</h1>
                        <h1>Dr. {onProcessAppointment.Doctor.name}</h1>
                    </div>
                </div>
            }
            <div className="col-12">
                <button className="btn btn-danger" onClick={(event) => {
                    event.preventDefault()
                    cancel(myAppointment.id)
                }}>cancel</button>
            </div>
        </div>
    )
}
