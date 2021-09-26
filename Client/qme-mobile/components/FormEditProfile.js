import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function FormEditProfile({ editUserSubmit, data, onLoading }) {
    const [ avatar, setAvatar ] = useState(data.avatar)
    const [ fullName, setFullName ] = useState(data.fullName)
    const [ phoneNumber, setPhoneNumber ] = useState(data.phoneNumber)
    const avatarList = [ 'default', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6', 'avatar7', 'avatar8', 'avatar9', 'avatar10', 'avatar11' ]
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

    function submitEditProfile() {
        let dataSubmit = { 
            id: data.id,
            username: data.username,
            email: data.email,
            password: '',
            avatar: avatar,
            fullName: fullName,
            dob: null,
            phoneNumber: phoneNumber,
            role: data.role
        }
        editUserSubmit(dataSubmit)
    }

    return (
        <View style={ styles.contentCard }>
            <Text style={ { alignSelf: 'center', fontWeight: 'bold', fontSize: 25 } }>Edit Profile</Text>
            <Text style={ { marginBottom: 10, marginTop: 20 } }>Name</Text>
            <TextInput onChangeText={ (text) => setFullName(text) } value={fullName} placeholder="Your Name" style={ styles.textInput } placeholderTextColor="black" />
            <Text style={ { marginBottom: 10, marginTop: 20 } }>Phone Number</Text>
            <TextInput onChangeText={ (text) => setPhoneNumber(text) } value={phoneNumber} placeholder="Phone Number" style={ styles.textInput } placeholderTextColor="black" />
            <Text style={ { marginVertical: 10 } }>Change Avatar</Text>
            <View style={{ flexDirection: 'row',
                alignItems: 'center' }}>
                <Image source={images[avatar]} style={{
                    height: 50, width: 50, borderColor: 'white', borderWidth: 3, marginHorizontal: 10
                }}/>
            </View>
            <Picker
                selectedValue={avatar}
                style={{ opacity: 0.7, borderWidth: 1, borderColor: 'black', fontSize: 20 }}
                onValueChange={(itemValue) => {
                    setAvatar(itemValue)
                }}
            >
                {
                    avatarList.map((avatar, index) => (
                        <Picker.Item label={avatar} value={avatar} key={index} />
                    ))
                }
            </Picker>
            { onLoading ? 
                <TouchableOpacity style={{ ...styles.button }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'black',color:"white" }}>Loading...</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={ { ...styles.button, backgroundColor: '#c8d5b9' } } onPress={ submitEditProfile }>
                    <Text style={ { ...styles.buttonText, color: 'black' } }>Submit</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: '#eae7dc',
        height: 50,
        borderBottomWidth: 1,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'black'
    },
    contentCard: {
        marginVertical: 5,
        backgroundColor: '#eae7dc',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    }
})
