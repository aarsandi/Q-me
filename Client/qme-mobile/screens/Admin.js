import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery, gql, useMutation } from '@apollo/client'
import { GETALLDATA, SUBSCRIBEAPPOINTMENT } from '../api/apolloClient'
import timeSince from '../helpers/timeSince'
import QRScanner from '../components/QRScanner'
import AppointmentTable from '../components/AppointmentTable'

const CHANGE_ONBOARD = gql`
  mutation SetInQueue($token:String, $id:Int){
    setInQueue(token: $token, id: $id){
        status
        message
    }
  }
`

export default function Admin({ navigation }) {
    const [ token, setToken ] = useState('')
    const [ selectedDoctor, setSelectedDoctor ] = useState(null)
    const [ showDashboard, setShowDashboard ] = useState(true)
    const [ showTable, setShowTable ] = useState(false)
    const [ showQrscanner, setShowQrscanner ] = useState(false)
    const { loading, error, data, subscribeToMore } = useQuery(GETALLDATA, { variables: {token: token, by: new Date().getDay()} })
    const [ setInQueue ] = useMutation(CHANGE_ONBOARD)

    function toDashboard() {
        setShowDashboard(true)
        setShowTable(false)
        setShowQrscanner(false)
    }

    function toTableAppointment(e, doctor) {
        e.preventDefault()
        setSelectedDoctor(doctor)
        setShowDashboard(false)
        setShowTable(true)
        setShowQrscanner(false)
    }

    function toQrScanner() {
        setShowDashboard(false)
        setShowTable(false)
        setShowQrscanner(true)
    }

    async function setOnboardOnPress(id) {
        const { data } = await setInQueue({
            variables: {
                token: token,
                id: id
            }
        })
        console.log(data)
    }

    async function logout() {
        await AsyncStorage.removeItem('access_token')
        navigation.navigate('LandingPage')
    }
    
    const auth = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const token = JSON.parse(access_token)
            if (!access_token || !token.role) {
                navigation.navigate("Login")
            } else if (access_token && token.role === 'patient') {
                navigation.navigate('Dashboard')
            } else {
                setToken(token.token)
            }
        } catch(err) {
            navigation.navigate("Login")
        }
    }

    useEffect(() => {
        auth()
    }, [auth]);

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIBEAPPOINTMENT,
            updateQuery(prev, { subscriptionData }) {
                if (!subscriptionData.data) {
                    return prev;
                }
                const newAppointment = subscriptionData.data.newAppointment
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
        })
    }, [subscribeToMore])

    if (loading) {
        return (
            <View style={ styles.container }>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Admin</Text>
                </View>
                <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Loading..</Text>
            </View>
        )
    } else if (error) {
        return (
            <View style={ styles.container }>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Admin</Text>
                </View>
                <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Oooops... Please Reload Your App</Text>
            </View>
        )
    } else if (data) {
        if (data.user.role !== 'admin') {
            navigation.navigate("Login")
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Admin</Text>
                    { !showDashboard &&
                        <TouchableOpacity onPress={toDashboard} style={{ backgroundColor: "blue" }}>
                            <Text style={{ color: "white" }}>to Dashboard</Text>
                        </TouchableOpacity>
                    }
                </View>
                { showDashboard && 
                    <View>
                        {
                            data.doctors.map((doctor) => (
                                <TouchableOpacity key={doctor.id} onPress={(e) => toTableAppointment(e, doctor)} style={{ ...styles.button, backgroundColor: "blue" }}>
                                    <Text style={{ ...styles.buttonText, color: "white" }}>{doctor.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        <TouchableOpacity onPress={toQrScanner} style={{ ...styles.button, backgroundColor: "blue" }}>
                            <Text style={{ ...styles.buttonText, color: "white" }}>Scan QR Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logout} style={{ ...styles.button, backgroundColor: 'red' }}>
                            <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                }
                { showTable &&
                    <AppointmentTable setOnboardOnPress={setOnboardOnPress} data={ data.appointments ? data.appointments : [] } selectedDoctor={ selectedDoctor ? selectedDoctor : null }/>
                }
                { showQrscanner &&
                    <QRScanner setOnboardOnPress={setOnboardOnPress}/>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffcccc'
    },
    header: {
        backgroundColor: '#e66767',
        height: 80,
        alignItems: 'center',
        paddingTop: 20
    },
    button: {
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 30
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    }
})
