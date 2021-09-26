import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useQuery, useMutation, gql } from '@apollo/client'
import { GETALLDATA, SUBSCRIBEAPPOINTMENT } from '../../api/apolloClient'
import timeSince from '../../helpers/timeSince'
import MakeAppointment from '../../components/patient/MakeAppointment'
import PatientNav from '../../components/patient/PatientNav'
import IfNotTodayAppointment from '../../components/patient/IfNotTodayAppointment'
import IfOnProcessAppointment from '../../components/patient/IfOnProcessAppointment'
import IfWaitingAppointment from '../../components/patient/IfWaitingAppointment'

const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment ($token:String, $id:Int){
    deleteAppointment (token: $token, id:$id){
        status
        message
    }
  }
`

export default function Dashboard() {
    const { loading, error, data, subscribeToMore } = useQuery(GETALLDATA, { variables: {token: localStorage.getItem("token")} })
    const [showModal, setShowModal] = useState(false)
    const [ deleteAppointment ] = useMutation(DELETE_APPOINTMENT)
    const history = useHistory()

    function closeModal() {
        setShowModal(false)
    }

    async function cancel(id) {
        await deleteAppointment({
            variables: {
                token: localStorage.getItem("token"),
                id: id
            }
        })
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
            })
        }
    }, [history, subscribeToMore])

    if (loading) {
        return (
            <>
                <h1>loading.....</h1>
            </>
        )
    } else if (error) {
        return (
            <div>
                <PatientNav dataUser={null}/>
                <h1>Homepage</h1>
            </div>
        )
    } else if (data) {
        if (data.user.role !== 'patient') {
            history.push("/admin")
        }
        const myAppointment = data.appointments.find(appointment => (
            appointment.UserId === data.user.id &&
            appointment.status !== 'done'
        ))
        let onProcessAppointment
        let waitingAppointments
        if (myAppointment) {
            onProcessAppointment = data.appointments.find( appointment => (
                appointment.DoctorId === myAppointment.DoctorId && 
                new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
                appointment.inQueue &&
                appointment.status === "onProcess"
            ))
            waitingAppointments = data.appointments.filter( appointment => (
                appointment.DoctorId === myAppointment.DoctorId && 
                new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
                appointment.inQueue &&
                appointment.status === "waiting"
            ))
        }
        return (
            <>
                <PatientNav dataUser={data.user}/>
                <div className="container">
                    <h1>QMe Board</h1>
                    { myAppointment ?
                        <div>
                            { timeSince(myAppointment.date) === 'today' ?
                                <>
                                    { myAppointment.status === 'onProcess' ?
                                        <IfOnProcessAppointment myAppointment={myAppointment}/> :
                                        <IfWaitingAppointment myAppointment={myAppointment} onProcessAppointment={onProcessAppointment ? onProcessAppointment : null} waitingAppointments={waitingAppointments} cancel={cancel}/>
                                    }
                                </> :
                                <IfNotTodayAppointment myAppointment={myAppointment} cancel={cancel}/>
                            }
                        </div> :
                        <>
                            <h1>you dont have appointment today</h1>
                            <button onClick={() => { setShowModal(true) }} className="btn btn-primary" >make Appointment</button>
                        </>
                    }
                </div>
                <Modal
                    show={showModal}
                    onHide={() => { setShowModal(false) }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Make Appointment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MakeAppointment data={data} closeModal={closeModal}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
