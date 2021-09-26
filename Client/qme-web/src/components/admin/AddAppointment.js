import React,{ useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'

const MAKE_APPOINTMENT = gql`
  mutation MakeAppointment($token:String, $patientName:String, $queueNumber:Int, $date:String, $inQueue:Int, $DoctorId:Int){
    makeAppointment(token:$token, patientName:$patientName, queueNumber:$queueNumber, date:$date, inQueue:$inQueue, DoctorId:$DoctorId){
        status
        message
    }
  }
`

export default function AddAppointment({ close, appointments, doctorIdEmit }) {
    const [patientName, setpatientName] = useState('')
    const [errorSubmit, setErrorSubmit] = useState('')
    const [ makeAppointment ] = useMutation(MAKE_APPOINTMENT)

    function closeModal(event) {
        event.preventDefault()
        close()
    }

    async function addAppointment(event) {
        event.preventDefault()
        try {
            if (!patientName) {
                setErrorSubmit('patient name cannot be empty')
            } else {
                let date = new Date()
                let queueNumber = null
                if (appointments.length > 0) {
                    let temp = appointments[appointments.length - 1].queueNumber + 1
                    queueNumber = temp
                } else {
                    queueNumber = 1
                }
                const { data } = await makeAppointment({
                    variables: {
                        token: localStorage.getItem("token"),
                        patientName: patientName,
                        queueNumber: queueNumber,
                        date: date,
                        inQueue: 1,
                        DoctorId: doctorIdEmit
                    }
                })
                if (data.makeAppointment.status === 'success') {
                    close()
                } else {
                    setErrorSubmit(data.makeAppointment.message)
                }
            }
        } catch(err) {
            setErrorSubmit('internal server error')
        }
    }
    return (
        <div>
            <form onSubmit={addAppointment}>
                <div className="form-group">
                    <label>Patient Name</label>
                    <input type="text" className="form-control" placeholder="Patient Name" value={patientName} onChange={(e) => { setpatientName(e.target.value) }}/>
                </div>
                {
                    errorSubmit &&
                    <p style={ { color: "red", marginTop: "20px" } }>{ errorSubmit }</p>
                }
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <button onClick={closeModal} className="btn btn-primary mt-2">Cancel</button>
        </div>
    )
}
