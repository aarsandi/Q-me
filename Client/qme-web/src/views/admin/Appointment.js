import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Modal } from 'react-bootstrap'
import { GETAPPOINTMENTANDUSER, SUBSCRIBEAPPOINTMENT } from '../../api/apolloClient'
import AdminNav from '../../components/admin/AdminNav'
import AppointmentTableData from '../../components/admin/AppointmentTableData'
import AddAppointment from '../../components/admin/AddAppointment'

export default function Appointment() {
    const history = useHistory();
    const { pathname } = useLocation()
    const [showModal, setShowModal] = useState(false);
    const { loading, error, data, subscribeToMore } = useQuery(GETAPPOINTMENTANDUSER, { variables: {token: localStorage.getItem("token")} })

    function closeModal(event) {
        setShowModal(false)
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push("/login")
        } else {
            subscribeToMore({
                document: SUBSCRIBEAPPOINTMENT,
                updateQuery(prev, { subscriptionData }) {
                    if (!subscriptionData.data) {
                        return prev;
                    }
                    const newAppointment = subscriptionData.data.newAppointment
                    if (newAppointment.status === "edited") {
                        return {
                            ...prev,
                            appointments: [ ...prev.appointments ]
                        }
                    } else if (newAppointment.status === "deleted") {
                        return {
                            ...prev,
                            appointments: prev.appointments.filter(appointment => appointment.id !== newAppointment.data.id)
                        }
                    } else {
                        return {
                            ...prev,
                            appointments: [ ...prev.appointments, newAppointment.data ]
                        };
                    }
                }
            });
        }
    }, [history, subscribeToMore]);

    if (loading) {
        return (
            <>
                <h1>loading.....</h1>
            </>
        )
    } else if (error) {
        return (
            <>
                <h1>Error.....</h1>
            </>
        )
    } else if (data) {
        if (data.user.role !== 'admin') {
            localStorage.removeItem('token')
            history.push("/login")
        }
        const doctorId = Number(pathname.slice(19))
        let byDoctor = data.appointments.filter(appointment => (
            appointment.DoctorId === doctorId &&
            new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15)
        ))

        return (
            <>
                <AdminNav />
                <div className="div-information container">
                    <h1>Appointments Table</h1>
                    <p onClick={ () => { setShowModal(true) } } className="div-date">new appointment</p>
                    { !byDoctor && <p style={ { color: '#24a19c' } }>No more patients on list!!</p> }
                    { byDoctor &&
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Id</th>
                                <th scope="col">No</th>
                                <th scope="col">Pasien</th>
                                <th scope="col">Booked Time</th>
                                <th scope="col">Status</th>
                                <th scope="col">Attendance</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                byDoctor.map((appointment) => (
                                    <AppointmentTableData
                                        key={ appointment.id }
                                        data={ appointment }
                                    />
                                ))
                            }
                            </tbody>
                        </table>
                    }
                </div>
                <Modal
                    show={showModal}
                    onHide={() => { setShowModal(false) }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddAppointment close={closeModal} appointments={byDoctor ? byDoctor : []} doctorIdEmit={doctorId}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    
}
