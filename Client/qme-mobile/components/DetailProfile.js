import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function DetailProfile({ logout, data, onLoading }) {
    return (
        <View>
            <View style={ styles.contentCard }>
                {/* <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 26,color:"#838383"}}>Profile</Text> */}
                <View style={{ marginVertical: 10, color:"#838383" }}>
                    <Text style={{ fontSize: 15 }}>Email</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color:"#838383"}}>{data.email}</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15 }}>Full Name</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold',color:"#838383"}}>{data.fullName}</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15 }}>Phone Number</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold',color:"#838383"}}>{data.phoneNumber}</Text>
                </View>
            </View>
            { onLoading ? 
                <TouchableOpacity style={{ ...styles.button }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'black',color:"white" }}>Loading...</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={{ ...styles.button }}>
                    <Text onPress={ logout } style={{ fontSize:20, fontWeight: 'bold', color: 'black',color:"white" }}>Logout</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    contentCard: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#eae7dc',
        borderRadius: 20,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#c8d5b9',
        height: 50,
        marginTop: 30,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
})
