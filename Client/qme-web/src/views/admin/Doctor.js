import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Modal } from 'react-bootstrap'
import { GETDOCTORANDUSER } from '../../api/apolloClient'
import AdminNav from '../../components/admin/AdminNav'
import DoctorTableData from '../../components/admin/DoctorTableData'
import AddDoctor from '../../components/admin/AddDoctor'
import EditDoctor from '../../components/admin/EditDoctor'

const ADD_DOCTOR = gql`
  mutation AddDoctor ($token:String, $name:String, $queueIndex:String, $description:String, $avatar:String, $availableAt:String, $policlinic:String, $maxCapacity:Int){
    addDoctor (
        token: $token,
        name: $name,
        queueIndex: $queueIndex,
        description: $description,
        avatar: $avatar,
        availableAt: $availableAt,
        policlinic: $policlinic,
        maxCapacity: $maxCapacity
    ){
        status
        message
    }
  }
`

const EDIT_DOCTOR = gql`
  mutation EditDoctor($token:String, $id:Int, $name:String, $queueIndex:String, $description:String, $avatar:String, $availableAt:String, $policlinic:String, $maxCapacity:Int){
    editDoctor(
        token: $token,
        id: $id,
        name: $name,
        queueIndex: $queueIndex,
        description: $description,
        avatar: $avatar,
        availableAt: $availableAt,
        policlinic: $policlinic,
        maxCapacity: $maxCapacity
    ){
        status
        message
    }
  }
`


const DELETE_DOCTOR = gql`
  mutation DeleteDoctor ($token:String, $id:Int){
    deleteDoctor (
        token: $token,
        id: $id
    ){
        status
        message
    }
  }
`

export default function Doctor() {
    const history = useHistory();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [doctorData, setDoctorData] = useState({})
    const [ addDoctor ] = useMutation(ADD_DOCTOR)
    const [ editDoctor ] = useMutation(EDIT_DOCTOR)
    const [ deleteDoctor ] = useMutation(DELETE_DOCTOR)
    const { loading, error, data } = useQuery(GETDOCTORANDUSER, { variables: {token: localStorage.getItem("token"), by: 7} })

    function deleteDoctorData(dataInput) {
        deleteDoctor({
            variables: {
                token: localStorage.getItem("token"), id: dataInput
            },
            refetchQueries: [ "GetDoctorsAndUser" ]
        }).then((data) => {
            if (data.data.deleteDoctor.status !== 'success') {
                console.log(data.deleteDoctor.message)
            }
        })
    }
    
    function addNewDoctor(dataInput) {
        addDoctor({
            variables: {
                token: localStorage.getItem("token"), ...dataInput
            },
            refetchQueries: [ "GetDoctorsAndUser" ]
        }).then((data) => {
            if (data.data.addDoctor.status === 'success') {
                closeAddModal()
            } else {
                console.log(data.addDoctor.message)
            }
        })
    }

    function closeAddModal() {
        setShowAddModal(false)
    }

    function editDoctorData(dataEdit) {
        editDoctor({
            variables: {
                token: localStorage.getItem("token"), ...dataEdit
            },
            refetchQueries: [ "GetDoctorsAndUser" ]
        }).then((data) => {
            if (data.data.editDoctor.status === 'success') {
                closeEditModal()
            } else {
                console.log(data.editDoctor.message)
            }
        })
    }

    function openEditModal(data) {
        setDoctorData(data)
        setShowEditModal(true)
    }

    function closeEditModal() {
        setShowEditModal(false)
    }

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
        return (
            <>
                <AdminNav />
                <div className="div-information container">
                    <h1>Doctors Table</h1>
                    <p onClick={() => { setShowAddModal(true) }} className="div-date">add new</p>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Polyclinic</th>
                            <th scope="col">Desc</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.doctors.map((doctor) => (
                                <DoctorTableData key={ doctor.id } data={ doctor } editDoctor={ openEditModal } deleteDoctor={ deleteDoctorData }/>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <Modal
                    show={showAddModal}
                    onHide={() => { setShowAddModal(false) }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Doctor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddDoctor close={closeAddModal} addNewDoctor={addNewDoctor}/>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={showEditModal}
                    onHide={() => { setShowEditModal(false) }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit New Doctor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditDoctor close={closeEditModal} doctorData={doctorData} editDoctorData={editDoctorData}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
