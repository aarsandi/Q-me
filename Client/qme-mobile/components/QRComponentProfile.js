import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import QRCode from "react-native-qrcode-svg"

export default function QRComponent({ data }) {
    return (
        <View style={ styles.contentCard }>
            <QRCode value={data} size={250}/>
        </View>
    )
}

const styles = StyleSheet.create({
    contentCard: {
        marginTop: 20,
        marginBottom: 20,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
