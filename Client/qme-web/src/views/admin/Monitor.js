import React, {useEffect, useState} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Nav from '../../components/admin/MonitorNav'
import { useQuery } from '@apollo/client'
import { SUBSCRIBEAPPOINTMENT, GETAPPOINTMENT } from '../../api/apolloClient'
import DoctorCard from '../../components/admin/DoctorCard'
import QueueCard from '../../components/admin/QueueCard'
import slide1 from '../../assets/quotes/slide1.jpg'
import slide2 from '../../assets/quotes/slide2.jpg'
import slide3 from '../../assets/quotes/slide3.jpg'
import slide4 from '../../assets/quotes/slide4.jpg'

export default function Monitor() {
    const { loading, error, data, subscribeToMore } = useQuery(GETAPPOINTMENT, { variables: {token: localStorage.getItem("token")} })
    const history = useHistory()
    const { pathname } = useLocation()
    const [ option, setOption ] = useState(null)
    const [ image, setImage ] = useState("")

    function handleOption() {
        const randomImage = [ slide1, slide2, slide3, slide4 ]
        setImage(randomImage[ Math.floor(Math.random() * 5) ])
    }

    useEffect(() => {
        if (option === "quotes") {
            setInterval(handleOption, 10000)
        }
    }, [ option ])

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
        let waitingAppointment = data.appointments.find(appointment => (
            appointment.DoctorId === Number(pathname.slice(15)) && 
            new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
            appointment.inQueue &&
            appointment.status === "waiting"
        ))
        let onProcessAppointment = data.appointments.find(appointment => (
            appointment.DoctorId === Number(pathname.slice(15)) && 
            new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
            appointment.inQueue &&
            appointment.status === "onProcess"
        ))
        
        return (
            <>
                <Nav />
                <div className="container container-monitor">
                    <div className="col-5 div-left">
                        <div className="container div-left_top">
                        <DoctorCard />
                        </div>
                        <div className="container div-left_bottom">
                        <select onChange={ (event) => setOption(event.target.value) } style={ { color: '#838383', marginRight: "10px", outline: "none", borderColor: "#838383", width: "20px", height: "20px", borderRadius: "50%" } }>
                            <option value="">Choose categori:</option>
                            <option data-toggle="modal" data-target="#exampleModalCenter" value="informasi">information</option>
                            <option value="quotes">quotes</option>
                        </select>
                        {
                            option === "quotes" ?
                            <div className="bottom-left">
                                {
                                    image === "" && <h1>Have a wonderful day</h1>
                                }
                                {
                                    image === undefined && <h1>Have a wonderful day</h1>
                                }
                                {
                                    image && <img src={ image } alt="Have a good day" style={ { width: '390px', height: '180px', margin: 'auto', borderRadius: "10px" } } />
                                }
                            </div> : option === "informasi" ?
                            <div className="bottom-left">
                                <textarea placeholder="Input your information here!" cols="35" spellCheck="false"></textarea>
                            </div> :
                                <div className="bottom-left"><h1>Have a wonderful day</h1>
                            </div>
                        }
                        </div>
                    </div>
                    <div className="div-right col-7">
                        { onProcessAppointment && <QueueCard data={onProcessAppointment}/> }
                        { waitingAppointment && <QueueCard data={waitingAppointment}/> }                        
                    </div>
                </div>
            </>
        )
    }
}
