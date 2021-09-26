import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { useQuery, gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GETUSER } from '../api/apolloClient'

import DetailProfile from '../components/DetailProfile'
import FormEditProfile from '../components/FormEditProfile'

const EDITUSER = gql`
  mutation editUser ($token:String, $id:Int, $fullName:String, $username:String, $email:String, $password:String, $dob:String , $phoneNumber: String, $avatar: String, $role: String){
    editUser (token:$token, id:$id, fullName:$fullName, username:$username, email:$email, password:$password, dob:$dob , phoneNumber:$phoneNumber, avatar:$avatar, role:$role){
        status
        message
    }
  }
`

export default function Profile({ navigation }) {
    const [ token, setToken ] = useState('')
    const [ showForm, setShowForm ] = useState(false)
    const [ showDetail, setShowDetail ] = useState(true)
    const [ onLoading, setOnLoading ] = useState(false)
    const { loading, error, data } = useQuery(GETUSER, { variables: {token: token} })

    const [ editUser ] = useMutation(EDITUSER)

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

    function toEditProfile() {
        setShowForm(true)
        setShowDetail(false)
    }

    function toDetailProfile() {
        setShowForm(false)
        setShowDetail(true)
    }

    async function logout(event) {
        setOnLoading(true)
        await AsyncStorage.removeItem('access_token')
        setOnLoading(false)
        navigation.navigate('Login')
    }

    function editUserSubmit(dataEdit) {
        setOnLoading(true)
        editUser({
            variables: {
                token: token, ...dataEdit
            },
            refetchQueries: [ "GetUser" ]
        }).then((data) => {
            if (data.data.editUser.status === 'success') {
                setOnLoading(false)
                toDetailProfile()
            } else {
                setOnLoading(false)
                console.log(data.editUser.message)
            }
        })
    }

    async function logout(event) {
        setOnLoading(true)
        await AsyncStorage.removeItem('access_token')
        setOnLoading(false)
        navigation.navigate('Login')
    }

    const auth = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const token = JSON.parse(access_token)
            if (!access_token || !token.token) {
                navigation.navigate('Login')
            } else {
                setToken(token.token)
            }
        } catch(e) {
            navigation.navigate("Login")
        }
    }

    useEffect(() => {
        auth()
    }, [auth]);

    if (loading) {
        return (
            <View>
                <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Loading..</Text>
            </View>
        )
    } else if (error) {
        return (
            <View>
                <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Oooops... Please Reload Your App</Text>
            </View>
        )
    } else if (data) {
        if (data.user.role === "admin") {
            navigation.navigate('Admin')
        }
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={ styles.container }>
                        <View style={styles.header}>
                            <Image source={images[data.user.avatar]} style={{
                                height: 70, width: 70, borderRadius: 40, borderColor: 'white', borderWidth: 3
                            }}/>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color:"black", marginLeft: 10 }}>{data.user.username}</Text>
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                { showDetail ? 
                                    <TouchableOpacity style={{ ...styles.buttonTop }} onPress={toEditProfile}>
                                        <Text style={{ fontSize:20, fontWeight: 'bold', color: '#e66767' }}>Edit Profile</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={{ ...styles.buttonTop }} onPress={toDetailProfile}>
                                        <Text style={{ fontSize:20, fontWeight: 'bold', color: '#e66767' }}>Back to Detail</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            { showDetail && <DetailProfile logout={logout} data={data.user} onLoading={onLoading}/> }
                            { showForm && <FormEditProfile editUserSubmit={editUserSubmit} data={data.user} onLoading={onLoading}/> }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'white',
        height: 80,
        paddingTop: 50,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonTop: {
        flex: 1,
        backgroundColor: '#c8d5b9',
        height: 40,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
})
