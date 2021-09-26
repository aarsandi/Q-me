import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GETALLDATA, SUBSCRIBEAPPOINTMENT } from '../api/apolloClient'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Picker } from '@react-native-picker/picker'

const MAKE_APPOINTMENT = gql`
  mutation MakeAppointment($token:String, $patientName:String, $queueNumber:Int, $date:String, $inQueue:Int, $DoctorId:Int){
    makeAppointment(token:$token, patientName:$patientName, queueNumber:$queueNumber, date:$date, inQueue:$inQueue, DoctorId:$DoctorId){
        status
        message
    }
  }
`

export default function MakeAppointment({ navigation }) {
    const [ token, setToken ] = useState('')
    const [ doctorName, setDoctorName ] = useState('')
    const [ patientName, setPatientName ] = useState('')
    const [ doctorId, setDoctorId ] = useState(null)
    const [ appointmentDate, setAppointmentDate ] = useState(new Date())
    const { loading, error, data } = useQuery(GETALLDATA, { variables: {token: token, by: 7} })
    const [ makeAppointment ] = useMutation(MAKE_APPOINTMENT)
    const [ errorSubmit, setErrorSubmit ] = useState('')
    const [ onLoading, setOnLoading ] = useState(false)

    const auth = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const token = JSON.parse(access_token)
            if (!access_token || !token.token) {
                navigation.navigate('Login')
            } else {
                setToken(token.token)
            }
        } catch(e) {
            navigation.navigate("Login")
        }
    }

    function submitAdd() {
        setOnLoading(true)
        if (!doctorId) {
            setOnLoading(false)
            setErrorSubmit('choose a doctor first !')
        } else {
            let queueNumber = null
            
            let byDoctor = data.appointments.filter(appointment => (
                appointment.DoctorId === doctorId &&
                new Date(appointment.date).toString().slice(0,15) === appointmentDate.toString().slice(0,15)
            ))
            if (byDoctor.length > 0) {
                let temp = data.appointments[data.appointments.length - 1].queueNumber + 1
                queueNumber = temp
            } else {
                queueNumber = 1
            }
            makeAppointment({
                variables: {
                    token: token,
                    patientName: patientName,
                    queueNumber: queueNumber,
                    date: appointmentDate,
                    inQueue: 0,
                    DoctorId: doctorId
                }
            }).then((data) => {
                if (data.data.makeAppointment.status === 'success') {
                    setOnLoading(false)
                    navigation.navigate("Homepage")
                } else {
                    setOnLoading(false)
                    setErrorSubmit(data.data.makeAppointment.message)
                }
            }).catch((err) => {
                setOnLoading(false)
                setErrorSubmit('internal server error')
            })
        }
    }

    useEffect(() => {
        auth()
    }, [auth]);

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Text style={ { fontSize: 20, fontWeight: 'bold' } }>Make Appointment</Text>
            </View>
            { loading &&
                <View>
                    <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Loading..</Text>
                </View>
            }
            { error &&
                <View>
                    <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Oooops... Please Reload Your App</Text>
                </View>
            }
            { data &&
                <>
                    {/* <Text style={ { fontSize: 18, color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' } }>Please book a new appointment below!</Text> */ }
                    <Text style={ { color: "#838383", fontWeight: 'bold', marginTop: 30, marginBottom: 20, alignSelf: 'center', textAlign: "center" } }>Choose a doctor to book below:</Text>
                    <Picker
                        selectedValue={doctorName}
                        style={{ marginHorizontal: 25, opacity: 0.7, borderWidth: 1, borderColor: 'black', fontSize: 20 }}
                        onValueChange={(itemValue) => {
                            if(itemValue) {
                                setPatientName(data.user.fullName)
                                setDoctorName(itemValue)
                                setDoctorId(itemValue.id)
                                let day = []
                                JSON.parse(itemValue.availableAt).forEach(temp => {
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
                                setAppointmentDate(appDate)
                            } else {
                                setDoctorName(itemValue)
                                setDoctorId(itemValue)
                            }
                        }}
                    >
                        <Picker.Item label='Choose your doctor...' value=''/>
                        {
                            data.doctors.map((doctor) => (
                                <Picker.Item label={'Dr. ' + doctor.name + ' - ' + doctor.policlinic + ' policlinic'} value={doctor} key={doctor.id} />
                            ))
                        }
                    </Picker>
                    { onLoading ?
                        <TouchableOpacity style={ { ...styles.button, backgroundColor: '#ea8685' } }>
                            <Text style={ { ...styles.buttonText, color: 'white' } }>Loading...</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={ submitAdd } style={ { ...styles.button, backgroundColor: '#ea8685' } }>
                            <Text style={ { ...styles.buttonText, color: 'white' } }>Add</Text>
                        </TouchableOpacity>
                    }
                    <Text style={ { color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', textAlign: "center" } }>{errorSubmit}</Text>
                    <View style={ { alignItems: 'center', padding: 0, marginTop: 10 } }>
                        <Image source={ require('../assets/appointment.png') } style={ styles.picture } />
                    </View>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: "#eae7dc",
        height: 80,
        alignItems: 'center',
        paddingTop: 40,
    },
    contentCard: {
        marginHorizontal: 20,
        marginTop: 50,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 45,
        marginTop: 30,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    picture: {
        width: 300, height: 250, padding: 0, margin: 0
    }
})
