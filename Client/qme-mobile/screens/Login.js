import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../api/apolloClient'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation }) {
    const [ onLoading, setOnLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ login ] = useMutation(LOGIN)

    async function signIn() {
        setOnLoading(true)
        try {
            const { data } = await login({
                variables: {
                    email: email,
                    password: password
                }
            })
            if (data) {
                if (data.login.status === 'success') {
                    if (data.login.role === 'admin') {
                        const access_token = { token: data.login.token, id: data.login.id, role: data.login.role }
                        await AsyncStorage.setItem('access_token', JSON.stringify(access_token))
                        setError('')
                        setOnLoading(false)
                        navigation.navigate('Admin')
                    } else {
                        const access_token = { token: data.login.token, id: data.login.id, role: data.login.role }
                        await AsyncStorage.setItem('access_token', JSON.stringify(access_token))
                        setError('')
                        setOnLoading(false)
                        navigation.navigate('Dashboard')
                    }
                } else {
                    setError(data.login.message)
                    setOnLoading(false)
                }
            } else {
                setError("error 500")
                setOnLoading(false)
            }
        } catch (err) {
            setError('internal server error')
            setOnLoading(false)
        }
    }

    function register(event) {
        event.preventDefault()
        navigation.navigate('Register')
    }

    const auth = async () => {
        const access_token = await AsyncStorage.getItem('access_token')
        const token = JSON.parse(access_token)
        if (access_token && token.role === 'admin') {
            navigation.navigate('Admin')
        } else if (access_token && token.role === 'patient') {
            navigation.navigate('Dashboard')
        }
    }
    
    useEffect(() => {
        auth()
    }, [auth])

    return (
        <View style={ styles.container }>
            <View style={ styles.div_login }>
                <Image source={ require('../assets/loginicon.png') } style={ styles.login_icon } />
                <TextInput onChangeText={ (text) => setEmail(text) } placeholder="Email" placeholderTextColor="#838383" style={ styles.textInput } />
                <TextInput secureTextEntry={ true } onChangeText={ (text) => setPassword(text) } placeholderTextColor="#838383" type="password" placeholder="Password" style={ styles.textInput } />
                <Text style={ { alignSelf: "center", color: "red", marginTop: 5 } }>{ error }</Text>
                { onLoading ?
                    <TouchableOpacity style={ {
                        ...styles.button, backgroundColor: '#ea8685',
                        marginTop: 5,
                    } }>
                        <Text style={ { ...styles.buttonText } }>Loading....</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={ signIn } style={ {
                        ...styles.button, backgroundColor: '#ea8685',
                        marginTop: 5,
                    } }>
                        <Text style={ { ...styles.buttonText } }>Login</Text>
                    </TouchableOpacity>
                }
                <View style={ { ...styles.button, marginBottom: 20 } }>
                    <Text style={ { ...styles.buttonText, color: "#797a7e", fontSize: 15 } }>Not a user? <Text onPress={ register } style={ { color: "#eebb4d" } }>Sign Up!</Text></Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#eae7dc",
        justifyContent: 'center',
        alignItems: 'center'
    },
    div_login: {
        backgroundColor: "#dee3e2",
        height: 400,
        width: 350,
        justifyContent: "center",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        shadowColor: "#6e6d6d",
        shadowOffset: {
            width: 15,
            height: 15
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 300,
        height: 40,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: 'white',
        marginTop: 10,
        height: 40,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        width: 300,
    },
    login_icon: {
        marginTop: 20,
        marginBottom: 20,
        width: 100,
        height: 100,
    }
});
