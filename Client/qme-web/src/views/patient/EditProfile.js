import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'
import { GETUSER } from '../../api/apolloClient'
import PatientNav from '../../components/patient/PatientNav'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const EDITUSER = gql`
  mutation editUser ($token:String, $id:Int, $fullName:String, $username:String, $email:String, $password:String, $dob:String , $phoneNumber: String, $avatar: String, $role: String){
    editUser (token:$token, id:$id, fullName:$fullName, username:$username, email:$email, password:$password, dob:$dob , phoneNumber:$phoneNumber, avatar:$avatar, role:$role){
        status
        message
    }
  }
`

export default function EditProfile() {
    const { loading, error, data } = useQuery(GETUSER, { variables: {token: localStorage.getItem("token")} })
    const [ avatar, setAvatar ] = useState('default')
    const [ fullName, setFullName ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const avatarList = [ 'default', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6', 'avatar7', 'avatar8', 'avatar9', 'avatar10', 'avatar11' ]
    const [ editUser ] = useMutation(EDITUSER)
    const history = useHistory()

    function editUserSubmit(event) {
        event.preventDefault()
        editUser({
            variables: {
                token: localStorage.getItem("token"), 
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                password: '',
                avatar: avatar,
                fullName: fullName,
                dob: null,
                phoneNumber: phoneNumber,
                role: 'patient'
            },
            refetchQueries: [ "GetAllData" ]
        }).then((data) => {
            console.log(data)
            history.push("/patient")
            // if (data.data.editDoctor.status === 'success') {
            //     closeEditModal()
            // } else {
            //     console.log(data.editDoctor.message)
            // }
        })
    }

    useEffect(() => {
        if(data) {
            setFullName(data.user.fullName)
            setPhoneNumber(data.user.phoneNumber)
            setAvatar(data.user.avatar)
        }
    }, [data])

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
        return (
            <>
                <PatientNav dataUser={data.user}/>
                <div className="container mx-5">
                    <h1>Edit Profile</h1>
                    <form onSubmit={editUserSubmit}>
                        <div class="form-group">
                            <label>Fullname</label>
                            <input type="text" class="form-control" value={fullName} onChange={(e) => { setFullName(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" class="form-control" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <h6>Avatar</h6>
                            <img className="mb-2" src={`/asset/avatar/${avatar}.png`} width="100%" alt='error'/>
                            <select class="form-control" value={avatar} onChange={(e) => {
                                setAvatar(e.target.value)
                            }}>
                                {
                                    avatarList.map((avatarItem, index) => (
                                        <option key={index} value={avatarItem}>{avatarItem}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        )
    }
    
}
