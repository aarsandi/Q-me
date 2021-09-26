import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery, gql, useMutation } from '@apollo/client'
import { GETAPPOINTMENTANDUSER, SUBSCRIBEAPPOINTMENT } from '../api/apolloClient'
import timeSince from '../helpers/timeSince'

import IfNoAppointment from '../components/IfNoAppointment'
import IfNotTodayAppointment from '../components/IfNotTodayAppointment'
import IfOnProcessAppointment from '../components/IfOnProcessAppointment'
import IfWaitingAppointment from '../components/IfWaitingAppointment'

const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment ($token:String, $id:Int){
    deleteAppointment (token: $token, id:$id){
        status
        message
    }
  }
`

export default function Home({ navigation }) {
    const [ token, setToken ] = useState('')
    const { loading, error, data, subscribeToMore } = useQuery(GETAPPOINTMENTANDUSER, { variables: {token: token} })
    const [ deleteAppointment ] = useMutation(DELETE_APPOINTMENT)

    function makeAppointment() {
        navigation.navigate('MakeAppointment')
    }

    async function cancel(id) {
        await deleteAppointment({
            variables: {
                token: token,
                id: id
            }
        })
    }

    const auth = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const token = JSON.parse(access_token)
            if (!access_token || !token.token) {
                navigation.navigate('Login')
            } else {
                setToken(token.token)
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
                });
            }
        } catch(e) {
            navigation.navigate("Login")
        }
    }

    useEffect(() => {
        auth()
    }, [auth]);

    if (loading) {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ { fontSize: 15, fontWeight: 'bold' } }>QMe Board</Text>
                </View>
                <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Loading..</Text>
            </View>
        )
    } else if (error) {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ { fontSize: 15, fontWeight: 'bold' } }>QMe Board</Text>
                </View>
                <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Oooops... Please Reload Your App</Text>
            </View>
        )
    } else if (data) {
        if (data.user.role === "admin") {
            navigation.navigate('Admin')
        }
        let onProcessAppointment
        const myAppointment = data.appointments.find(appointment => (
            appointment.UserId === data.user.id &&
            appointment.status !== 'done'
        ))
        if (myAppointment) {
            onProcessAppointment = data.appointments.find( appointment => (
                appointment.DoctorId === myAppointment.DoctorId && 
                new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
                appointment.inQueue &&
                appointment.status === "onProcess"
            ))
        }

        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ { fontSize: 15, fontWeight: 'bold' } }>QMe Board</Text>
                </View>
                { myAppointment ?
                    <View style={ { display: "flex", alignItems: "center" } }>
                        { timeSince(myAppointment.date) === 'today' ?
                            <>
                                { myAppointment.status === 'onProcess' ?
                                    <IfOnProcessAppointment myAppointment={myAppointment}/> :
                                    <IfWaitingAppointment myAppointment={myAppointment} onProcessAppointment={onProcessAppointment ? onProcessAppointment : null} cancel={cancel}/>
                                }
                            </> :
                            <IfNotTodayAppointment myAppointment={myAppointment} cancel={cancel}/>
                        }
                    </View> :
                    <IfNoAppointment makeAppointment={makeAppointment}/>
                }
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex"
    },
    header: {
        backgroundColor: '#eae7dc',
        height: 70,
        alignItems: 'center',
        paddingTop: 40,
        borderRadius: 15,
    },
    numberCard: {
        marginHorizontal: 20,
        marginTop: 10,
        height: 80,
        width: 80,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    contentCard: {
        marginHorizontal: 20,
        marginTop: 10,
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 7000,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        marginTop: 60,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    body_indo: {
        borderRadius: 40,
        marginTop: 10,
        alignItems: "center",
        backgroundColor: "#c8d5b9",
        height: 300,
        width: 350,
    },
    bottom_info: {
        marginTop: 30
    }
})
