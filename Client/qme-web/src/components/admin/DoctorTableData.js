import React from 'react'

export default function DoctorTableData({data, editDoctor, deleteDoctor}) {
    return (
        <tr style={{ backgroundColor: "#85a392" }}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.policlinic}</td>
            <td>{data.description}</td>
            <td><button onClick={() => { editDoctor(data) }} className="btn btn-warning">edit</button> <button onClick={() => { deleteDoctor(data.id) }} className="btn btn-danger">delete</button></td>
        </tr>
    )
}
