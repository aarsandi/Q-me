import React, {useState } from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import { app } from '../../base'

export default function AddDoctor({ close, addNewDoctor }) {
    const [name, setName] = useState('')
    const [queueIndex, setQueueIndex] = useState('')
    const [description, setDescription] = useState('')
    const [policlinic, setPoliclinic] = useState('')
    const [recentAvailableAt, setRecentAvailableAt] = useState([])
    const [maxCapacity, setmaxCapacity] = useState(null)

    const [avatar, setAvatar] = useState('')
    const [onUploading, setOnUploading] = useState(false)

    const [errorSubmit, setErrorSubmit] = useState('')

    const onAvatarChange = async (e) => {
        setOnUploading(true)
        if(e.target.files && e.target.files[0]) {
            const filename = e.target.files[0]
            const storageRef = app.storage().ref()
            const date = new Date().toDateString()
            const fileRef = storageRef.child(`doctorAvatar/${date}/${filename.name}`)
            await fileRef.put(filename)
            setAvatar(await fileRef.getDownloadURL())
            setOnUploading(false)
        } else {
            setErrorSubmit('image not uploaded')
            setAvatar('')
            setOnUploading(false)
        }
    }

    const onAvatarDelete = async (e, image) => {
        e.preventDefault()
        try{
            setOnUploading(true)
            const storageRef = app.storage().refFromURL(image)
            await storageRef.delete()
            setAvatar('')
            setOnUploading(false)
        } catch(err) {
            setOnUploading(true)
            setAvatar('')
            setOnUploading(false)
        }
    }

    const [ days ] = useState([
        {name: 'Minggu', id: 0},
        {name: 'Senin', id: 1},
        {name: 'Selasa', id: 2},
        {name: 'Rabu', id: 3},
        {name: 'Kamis', id: 4},
        {name: 'Jumat', id: 5},
        {name: 'Sabtu', id: 6}
    ])

    function closeModal(event) {
        event.preventDefault()
        close()
    }

    async function addDoctorSubmit(event) {
        event.preventDefault()
        let data = {
            name: name,
            queueIndex: queueIndex,
            description: description,
            avatar: avatar,
            availableAt: JSON.stringify(recentAvailableAt),
            policlinic: policlinic,
            maxCapacity: Number(maxCapacity)
        }
        addNewDoctor(data)
    }

    return (
        <div>
            <form onSubmit={addDoctorSubmit}>
                <div className="form-group">
                    <label>Doctor Name</label>
                    <input type="text" className="form-control" placeholder="doctor name" value={name} onChange={(e) => { setName(e.target.value) }} required/>
                </div>
                <div className="form-group">
                    <label>Doctor Index Letter</label>
                    <input type="text" className="form-control" placeholder="#A" value={queueIndex} onChange={(e) => { setQueueIndex(e.target.value) }} required/>
                </div>
                <div className="form-group">
                    <label>Doctor Description</label>
                    <input type="text" className="form-control" placeholder="description" value={description} onChange={(e) => { setDescription(e.target.value) }} required/>
                </div>
                <div className="form-group">
                    <label>Doctor PolyClinic</label>
                    <input type="text" className="form-control" placeholder="policlinic" value={policlinic} onChange={(e) => { setPoliclinic(e.target.value) }} required/>
                </div>
                <div className="form-group">
                    <label>Available At</label>
                    <Multiselect
                        options={days}
                        selectedValues={[]}
                        onRemove={(selectedList) => {
                            setRecentAvailableAt(selectedList)
                        }}
                        onSelect={(selectedList) => {
                            setRecentAvailableAt(selectedList)
                        }}
                        displayValue="name"
                    />
                </div>
                <div className="form-group">
                    <label>Doctor Avatar</label>
                    {
                        onUploading ?
                        <>
                            <h1>onuploading.....</h1>
                        </>:
                        <>
                            { avatar ?
                            <>
                                <img src={avatar} width="80px" alt='error'/>
                                <button className="btn" onClick={(event) => onAvatarDelete(event, avatar)}>x</button>
                            </>:
                            <input type="file" onChange={onAvatarChange}/>
                            }
                        </>
                    }
                </div>
                <div className="form-group">
                    <label>Queue Capacity</label>
                    <input type="number" className="form-control" placeholder="0" value={maxCapacity} onChange={(e) => { setmaxCapacity(e.target.value) }} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <button onClick={closeModal} className="btn btn-primary mt-2">Cancel</button>
            {
                errorSubmit &&
                <p style={ { color: "red", marginTop: "20px" } }>{ errorSubmit }</p>
            }
        </div>
    )
}
