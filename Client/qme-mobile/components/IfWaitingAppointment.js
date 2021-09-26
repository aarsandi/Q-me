import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import QRComponentProfile from './QRComponentProfile'

export default function IfWaitingAppointment({ myAppointment, onProcessAppointment, cancel }) {
    return (
        <ScrollView>
            { !myAppointment.inQueue &&
            <>
                <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>You not on Board</Text>
                <Text style={ { fontSize: 17, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>Please scan this QR Code</Text>
                <Text style={ { fontSize: 17, fontWeight: 'bold', alignSelf: 'center', color: "#e66767" } }>with our staff at the hospital</Text>
                <QRComponentProfile data={toString(myAppointment.id)}/>
            </>
            }
            <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>Your Appointment Today</Text>
            <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#e66767" } }>You are on Board</Text>
            <View style={ styles.body_indo }>
                <View style={ { display: "flex", marginTop: 20, alignItems: "center" } }>
                    <View style={ { marginBottom: 20 } }>
                        <Text style={ { fontSize: 30, color: "#2d4059", fontWeight: "bold" } }>polyclinic - {myAppointment.Doctor.policlinic}</Text>
                    </View>
                    <View style={ { display: "flex", flexDirection: "row" } }>
                        <View style={ { alignItems: "center" } }>
                            <Text style={ { color: "#e66767", width: 150, height: 30, textAlign: "center", fontSize: 18 } }>Your Queue</Text>
                            <View style={ styles.contentCard }>
                                <Text style={ { fontSize: 40, fontWeight: 'bold', color: "#e66767" } }>{myAppointment.Doctor.queueIndex} {myAppointment.queueNumber}</Text>
                            </View>
                        </View>
                        { onProcessAppointment &&
                            <View style={ { alignItems: "center" } }>
                                <Text style={ { color: "#e66767", width: 150, height: 30, textAlign: "center", fontSize: 18 } }>Current Queue</Text>
                                <View style={ styles.contentCard }>
                                    <Text style={ { fontSize: 40, fontWeight: 'bold', color: "#e66767" } }>{onProcessAppointment.Doctor.queueIndex} {onProcessAppointment.queueNumber}</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
                <View style={ styles.bottom_info }>
                    <Text style={ { fontSize: 20, fontWeight: 'bold', color: "#838383" } }>Dr.{myAppointment.Doctor.name}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={(event) => {
                event.preventDefault()
                cancel(myAppointment.id)
            }} style={ { ...styles.button, backgroundColor: '#ea8685', paddingHorizontal: 50 } }>
                <Text style={ { ...styles.buttonText, color: 'white' } }>Cancel</Text>
            </TouchableOpacity>
        </ScrollView>
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
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 100
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
