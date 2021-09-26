import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function IfNoAppointment({ makeAppointment }) {
    return (
        <>
            <Text style={ { fontSize: 18, color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', marginTop: 30 } }>You don't have any appointment</Text>
            <Text style={ { color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', textAlign: "center", width: 300 } }>Please make a new appointment to consult with our doctors !</Text>
            <TouchableOpacity onPress={(event) => {
                event.preventDefault()
                makeAppointment()
            }} style={ { ...styles.button, backgroundColor: '#ea8685' } }>
                <Text style={ { ...styles.buttonText, color: 'white' } }>Make Appointment</Text>
            </TouchableOpacity>
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
