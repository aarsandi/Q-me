import React from 'react'
import { gql, useMutation } from '@apollo/client'

const CHANGE_ONBOARD = gql`
  mutation SetInQueue($token:String, $id:Int){
    setInQueue(token: $token, id: $id){
        status
        message
    }
  }
`

const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment ($token:String, $id:Int){
    deleteAppointment (token: $token, id: $id){
        status
        message
    }
  }
`

export default function AppointmentTableData({data, index}) {
    const [ setInQueue ] = useMutation(CHANGE_ONBOARD)
    const [ deleteAppointment ] = useMutation(DELETE_APPOINTMENT)

    async function changeOnBoard(event, id) {
        event.preventDefault()
        const { data } = await setInQueue({
            variables: {
                token: localStorage.getItem("token"),
                id: id
            }
        })
    }

    async function deleteAppointmentById(event, id) {
        event.preventDefault()
        const { data } = await deleteAppointment({
            variables: {
                token: localStorage.getItem("token"),
                id: id
            }
        })
        console.log(data)
    }

    return (
        <tr style={{ backgroundColor: "#85a392" }}>
            <td>{data.id}</td>
            <td>{data.queueNumber}</td>
            <td>{data.patientName}</td>
            <td>{new Date(data.date).toString().slice(0,15)}</td>
            <td>{data.status}</td>
            <td style={{ color: "#ea5455" }}>{data.inQueue ? 'on board': 'not on board'}</td>
            <td></td>
            <td><button onClick={(event) => deleteAppointmentById(event, data.id)} className="btn btn-danger mr-2">Delete</button>
                {!data.inQueue ? <button onClick={(event) => changeOnBoard(event, data.id)} className="btn btn-primary">set to onboard</button> : ''}
            </td>
        </tr>
    )
}
