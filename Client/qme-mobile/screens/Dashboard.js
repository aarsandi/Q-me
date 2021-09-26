import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

import Profile from './Profile'
import HomeNavigation from './navigator/HomeNavigator'

export default function Dashboard() {
    return (
        <Tab.Navigator barStyle={ { backgroundColor: 'white' } } screenOptions={ ({ route }) => ({
            tabBarIcon: ({ color }) => {
                let iconName
                if (route.name == 'Home') {
                    iconName = 'ios-home'
                } else if (route.name == 'Profile') {
                    iconName = 'ios-person'
                }
                return <Ionicons name={ iconName } color={ color } size={ 25 } />
            }
        }) }>
            <Tab.Screen name="Home" component={ HomeNavigation } />
            <Tab.Screen name="Profile" component={ Profile } />
        </Tab.Navigator>
    )
}