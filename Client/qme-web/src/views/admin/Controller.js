import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client'
import { GETAPPOINTMENTANDUSER, SUBSCRIBEAPPOINTMENT } from '../../api/apolloClient'
import QueueCard from '../../components/admin/QueueCard'
import AdminNav from '../../components/admin/AdminNav'

const CHANGE_STATUS = gql`
  mutation ChangeStatus($token:String, $id:Int, $status:String){
    changeStatus(token: $token, id: $id, status:$status){
        status
        message
    }
  }
`

export default function Controller() {
    const { pathname } = useLocation()
    const { loading, error, data, subscribeToMore } = useQuery(GETAPPOINTMENTANDUSER, { variables: {token: localStorage.getItem("token")} })
    const history = useHistory();
    const [ changeStatus ] = useMutation(CHANGE_STATUS)

    async function startAppointment(event, waitingAppointment) {
        event.preventDefault()
        await changeStatus({
            variables: {
                token: localStorage.getItem("token"),
                id: waitingAppointment.id,
                status: 'onProcess'
            }
        })
    }

    async function doneAppointmentAction(event, onProcessAppointment) {
        event.preventDefault()
        await changeStatus({
            variables: {
                token: localStorage.getItem("token"),
                id: onProcessAppointment.id,
                status: 'done'
            }
        })
    }

    async function nextAppointment(event, waitingAppointment, onProcessAppointment) {
        event.preventDefault()
        if(onProcessAppointment) {
            await changeStatus({
                variables: {
                    token: localStorage.getItem("token"),
                    id: waitingAppointment.id,
                    status: 'onProcess'
                }
            })
            await changeStatus({
                variables: {
                    token: localStorage.getItem("token"),
                    id: onProcessAppointment.id,
                    status: 'done'
                }
            })
        } else {
            const changeToOnProcess = await changeStatus({
                variables: {
                    token: localStorage.getItem("token"),
                    id: waitingAppointment.id,
                    status: 'onProcess'
                }
            })
        }
    }

    async function previousAppointment(event, onProcessAppointment, doneAppointment) {
        event.preventDefault()
        if(onProcessAppointment) {
            await changeStatus({
                variables: {
                    token: localStorage.getItem("token"),
                    id: doneAppointment.id,
                    status: 'onProcess'
                }
            })
            await changeStatus({
                variables: {
                    token: localStorage.getItem("token"),
                    id: onProcessAppointment.id,
                    status: 'waiting'
                }
            })
            
        } else {
            await changeStatus({
                variables: {
                    token: localStorage.getItem("token"),
                    id: doneAppointment.id,
                    status: 'onProcess'
                }
            })
        }
    }
  
    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIBEAPPOINTMENT,
            updateQuery(prev, { subscriptionData }) {
                if (!subscriptionData.data) {
                    return prev;
                }
                const newAppointment = subscriptionData.data.newAppointment;
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
    }, [subscribeToMore])
    
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push("/login")
        }
    }, [history]);

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
        let waitingAppointment = data.appointments.find(appointment => (
            appointment.DoctorId === Number(pathname.slice(18)) && 
            new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
            appointment.inQueue &&
            appointment.status === "waiting"
        ))
        let onProcessAppointment = data.appointments.find(appointment => (
            appointment.DoctorId === Number(pathname.slice(18)) && 
            new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
            appointment.inQueue &&
            appointment.status === "onProcess"
        ))
        let doneAppointment = data.appointments.find(appointment => (
            appointment.DoctorId === Number(pathname.slice(18)) && 
            new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
            appointment.inQueue &&
            appointment.status === "done"
        ))
        
        return (
        <div className="coba-nyambung container-fluid div-controller">
            <div className="container div-antrian_card d-flex">
                <AdminNav />
                <div className="row">
                    { waitingAppointment && <QueueCard data={waitingAppointment}/> }
                    { onProcessAppointment && <QueueCard data={onProcessAppointment}/> }
                </div>
            </div>
            { !waitingAppointment && !onProcessAppointment && 
            <>
                <p style={ { color: '#24a19c' } }>All done</p>
                <p style={ { color: '#24a19c' } }>No more patients on waiting list!!</p>
            </>
            }
            <div className="d-flex ">
                { waitingAppointment && !onProcessAppointment && <button onClick={(e) => startAppointment(e, waitingAppointment)} className="btn btn-primary mx-2">Start</button> }
                { waitingAppointment && onProcessAppointment && <button onClick={(e) => nextAppointment(e, waitingAppointment, onProcessAppointment)} className="btn btn-primary mx-2">Next</button> }
                { onProcessAppointment && doneAppointment  && <button onClick={(e) => previousAppointment(e, onProcessAppointment, doneAppointment)} className="btn btn-warning mx-2">Previous</button> }
                { !onProcessAppointment && doneAppointment  && <button onClick={(e) => previousAppointment(e, onProcessAppointment, doneAppointment)} className="btn btn-warning mx-2">Previous</button> }
                { !waitingAppointment && onProcessAppointment && <button onClick={(e) => doneAppointmentAction(e, onProcessAppointment)} className="btn btn-warning mx-2">Done</button> }
            </div>
        </div>
        )
    }
}
