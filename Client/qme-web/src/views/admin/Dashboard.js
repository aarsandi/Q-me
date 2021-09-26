import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GETDOCTORANDUSER } from '../../api/apolloClient'
import AppointmentCard from '../../components/admin/AppointmentCard'
import AdminNav from '../../components/admin/AdminNav'

export default function Dashboard() {
  const { loading, error, data } = useQuery(GETDOCTORANDUSER, { variables: {token: localStorage.getItem("token"), by: new Date().getDay()} })
  const history = useHistory()
  
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
      <div className="coba-nyambung container-fluid div-controller">
        <div className="container div-antrian_card d-flex">
          <AdminNav />
          <div className="row">
          {
            data.doctors.map((doctor) => (
                <AppointmentCard
                    key={ doctor.id }
                    data={ doctor }
                />
            ))
          }
          </div>
        </div>
        <p style={ { color: '#24a19c' } }>All done</p>
        <p style={ { color: '#24a19c' } }>No more patients on waiting list!!</p>
      </div>
    )
  }
}
