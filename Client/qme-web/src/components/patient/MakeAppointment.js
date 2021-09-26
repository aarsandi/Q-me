import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const MAKE_APPOINTMENT = gql`
  mutation MakeAppointment($token:String, $patientName:String, $queueNumber:Int, $date:String, $inQueue:Int, $DoctorId:Int){
    makeAppointment(token:$token, patientName:$patientName, queueNumber:$queueNumber, date:$date, inQueue:$inQueue, DoctorId:$DoctorId){
        status
        message
    }
  }
`

export default function MakeAppointment({data, closeModal}) {
    const [ doctorId, setDoctorId ] = useState(null)
    const [ makeAppointment ] = useMutation(MAKE_APPOINTMENT)
    const [ errorSubmit, setErrorSubmit ] = useState('')

    function submitMakeAppointment(event) {
        event.preventDefault()
        if (!doctorId) {
            setErrorSubmit('choose doctor first')
        } else {
            const doctorData = data.doctors.find(doctor => doctor.id === doctorId)
            if(!doctorData) {
                setErrorSubmit('doctor not find')
            } else {
                // get queueNumber from data appointment by doctor and today date
                let queueNumber = null
                let byDoctor = data.appointments.filter(appointment => (
                    appointment.DoctorId === doctorId &&
                    new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15)
                ))
                if (byDoctor.length > 0) {
                    let temp = data.appointments[data.appointments.length - 1].queueNumber + 1
                    queueNumber = temp
                } else {
                    queueNumber = 1
                }
                // get date from selected doctor data and compare with new Date
                let day = []
                JSON.parse(doctorData.availableAt).forEach(temp => {
                    if (new Date().getDay() === temp.id) {
                        day.push(0)
                    } else if (new Date().getDay() > temp.id) {
                        day.push((6 - new Date().getDay()) + (temp.id + 1))
                    } else if (new Date().getDay() < temp.id) {
                        day.push(temp.id - new Date().getDay())
                    }
                })
                day.sort()
                const appDate = new Date()
                appDate.setDate(appDate.getDate() + day[0])
                // send data to api request
                makeAppointment({
                    variables: {
                        token: localStorage.getItem("token"),
                        patientName: data.user.fullName,
                        queueNumber: queueNumber,
                        date: appDate,
                        inQueue: 0,
                        DoctorId: doctorId
                    }
                }).then((data) => {
                    if (data.data.makeAppointment.status === 'success') {
                        closeModal()
                    } else {
                        setErrorSubmit(data.data.makeAppointment.message)
                    }
                }).catch((err) => {
                    setErrorSubmit('internal server error')
                })
            }
        }
    }

    return (
        <div>
            <form onSubmit={submitMakeAppointment}>
                <div class="form-group">
                    <label>Choose your doctor...</label>
                    <select class="form-control" onChange={ (e) => {
                        setDoctorId(Number(e.target.value))
                    }}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {
                            data.doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>{'Dr. ' + doctor.name + ' - ' + doctor.policlinic + ' policlinic'}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <button onClick={closeModal} className="btn btn-primary mt-2">Cancel</button>
            {
                errorSubmit &&
                <p style={{ color: "red" }}>{ errorSubmit }</p>
            }
        </div>
    )
}
