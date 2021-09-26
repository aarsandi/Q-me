import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function IfOnProcessAppointment({ myAppointment }) {
    return (
        <>
            <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Hello, {myAppointment.patientName} !</Text>
            <Text style={ { fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: "#838383" } }>Thank you for waiting</Text>
            <Text style={ { fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: "#838383" } }>It's your turn now</Text>
            <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, color: "#838383" } }>Please enter room {myAppointment.Doctor.queueIndex}</Text>
            <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: "#838383" } }>for {myAppointment.Doctor.policlinic} polyclinic</Text>
            <Text style={ { fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Get well soon :)</Text>
            <Text style={ { fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: "#838383" } }>Good luck</Text>
        </>
    )
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
