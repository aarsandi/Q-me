import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QRScanner({ setOnboardOnPress }) {
    const [ permission, setPermission ] = useState(null)
    const [ scanned, setScanned ] = useState(false)

    const request = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setPermission(status === "granted");
    }

    useEffect(() => {
        request()
    }, [request]);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        //Handle buat post ke dental/general
        if(data) {
            const parseData = JSON.parse(data)
            if (Number(parseData.inQueue)) {
                alert(`appointment already on board`);
            } else {
                alert(`Bar code with type ${ type } and data ${ parseData.id } has been scanned!`);
                setOnboardOnPress(Number(parseData.id))
            }
        } else {
            alert(`tidak ada data`)
        }
      };
    
      if (permission === false) {
        return <Text>No access to camera!</Text>;
      }

    return (
        <View style={ { flex: 1, backgroundColor: "black"} }>
            <View style={ styles.header }>
                <Text style={ { fontSize: 20, fontWeight: 'bold' } }>QRCode Scanner</Text>
            </View>
            <View style={ { flex: 0.9, margin: 0  } }>
                <BarCodeScanner
                onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned }
                style={ StyleSheet.absoluteFill }
                />
            </View>
            { scanned && (
                <Button title={ "Tap to Scan Again" } onPress={ () => setScanned(false) } style={ { marginHorizontal: 20 } } />
            ) }
            { !scanned && <Text style={ { textAlign: "center", fontSize: 20, color: 'white' } }>Scanning...</Text> }
        </View>
    )
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
        paddingTop: 40,
        marginBottom: 10
    },
    droidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? 25 : 0,
      height: null,
      width: null,
      justifyContent: "center",
      alignItems: "center",
    }
});
