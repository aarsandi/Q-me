import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import timeSince from '../helpers/timeSince'

export default function IfNotTodayAppointment({ myAppointment, cancel }) {
    return (
        <>
            <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>Your Appointment</Text>
            <View style={ styles.body_indo }>
                <View style={ { display: "flex", marginTop: 20, alignItems: "center" } }>
                    <View style={ { display: "flex", flexDirection: "row" } }>
                        <View style={ { alignItems: "center" } }>
                            <Text style={ { color: "#e66767", textAlign: "center", fontSize: 18 } }>{myAppointment.Doctor.policlinic} polyclinic</Text>
                        </View>
                    </View>
                    <Text style={ { fontSize: 30, color: "#2d4059", fontWeight: "bold" } }>Your Number : {myAppointment.Doctor.queueIndex} {myAppointment.queueNumber}</Text>
                </View>
                <View style={ styles.bottom_info }>
                    <Text style={ { fontSize: 20, fontWeight: 'bold', color: "#838383" } }>Dr. {myAppointment.Doctor.name}</Text>
                </View>
                <Text style={ { fontSize: 20, fontWeight: 'bold', color: "#838383" } }>Starts at {timeSince(myAppointment.date)}</Text>
                <TouchableOpacity onPress={(event) => {
                    event.preventDefault()
                    cancel(myAppointment.id)
                }} style={ { ...styles.button, backgroundColor: '#ea8685', paddingHorizontal: 50 } }>
                    <Text style={ { ...styles.buttonText, color: 'white' } }>Cancel</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 10,
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
