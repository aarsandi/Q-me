import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'


export default function AppointmentTable({ setOnboardOnPress, data, selectedDoctor }) {
    const images = {
        'default': require(`../assets/avatar/default.png`),
        'avatar1': require(`../assets/avatar/avatar1.png`),
        'avatar2': require(`../assets/avatar/avatar2.png`),
        'avatar3': require(`../assets/avatar/avatar3.png`),
        'avatar4': require(`../assets/avatar/avatar4.png`),
        'avatar5': require(`../assets/avatar/avatar5.png`),
        'avatar6': require(`../assets/avatar/avatar6.png`),
        'avatar7': require(`../assets/avatar/avatar7.png`),
        'avatar8': require(`../assets/avatar/avatar8.png`),
        'avatar9': require(`../assets/avatar/avatar9.png`),
        'avatar10': require(`../assets/avatar/avatar10.png`),
        'avatar11': require(`../assets/avatar/avatar11.png`)
    }

    function setOnboard(event, id) {
        event.preventDefault()
        setOnboardOnPress(id)
    }
    
    if (!selectedDoctor && !data) {
        <View>
            <Text>Error loading data .....</Text>
        </View>
    } else {
        const appointments = data.filter( appointment => (
            appointment.DoctorId === selectedDoctor.id && 
            new Date(appointment.date).toString().slice(0,15) === new Date().toString().slice(0,15) && 
            appointment.status !== "done"
        ))
        return (
            <View style={style.container}>
                <View style={{
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    paddingVertical: 13
                }}>
                    <Text>dr. {selectedDoctor.name}</Text>
                    <Text>{selectedDoctor.policlinic} policlinic</Text>
                </View>
                <ScrollView>
                    {
                        appointments.map((appointment) => (
                            <View key={appointment.id} style={style.card}>
                                <Image source={images['default']} style={style.image} />
                                <View>
                                    <Text>{ appointment.patientName }</Text>
                                    <Text>{ appointment.status }</Text>
                                </View>
                                { !appointment.inQueue && 
                                    <TouchableOpacity onPress={(event) => setOnboard(event, appointment.id)} style={{
                                        borderRadius: 35,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingVertical: 10, paddingHorizontal: 10, backgroundColor: "yellow", marginLeft: 'auto' }}>
                                        <Text>set to onboard</Text>
                                    </TouchableOpacity> 
                                }
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    text: {
        fontSize: 30
    },
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    card: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        marginRight: 10,
        width: 60,
        height: 60,
        borderRadius: 999
    }
})
