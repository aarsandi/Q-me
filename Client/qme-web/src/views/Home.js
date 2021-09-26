import React from 'react'
import HomeWithToken from '../components/site/HomeWithToken'
import HomeWithoutToken from '../components/site/HomeWithoutToken'

export default function Home() {
    if (localStorage.getItem("token")) {
        return (
            <HomeWithToken/>
        )
    } else {
        return (
            <HomeWithoutToken/>
        )
    }
}
