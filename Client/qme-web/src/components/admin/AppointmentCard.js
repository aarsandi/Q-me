import React from 'react'
import { Link } from 'react-router-dom'

export default function AppointmentCard({data}) {
    return (
        <>
            <div className="col-4">
                <div className="card card-poli d-flex">
                        <div className="card-body">
                            <h3 className="card-title">{data.policlinic} Policlinic</h3>
                                <h5 className="card-title">dr.{data.name}</h5>
                            <hr/>
                        </div>
                    <div className="button_controller d-flex">
                        <Link to={`/admin/controller/${data.id}`}>
                            <p style={ { backgroundColor: "#3797a4" } }>Controller</p>
                        </Link>
                        <Link to={`/admin/appointment/${data.id}`}>
                            <p style={ { backgroundColor: "#f8b24f" } }>List</p>
                        </Link>
                        <Link to={`/admin/monitor/${data.id}`}>
                            <p style={ { backgroundColor: "#f8b24f" } }>Monitor</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
