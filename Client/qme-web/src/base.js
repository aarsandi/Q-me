import firebase from 'firebase'
import 'firebase/storage'

export const app = firebase.initializeApp({
    "projectId": "queue-mee",
    "appId": "1:365580319893:web:26692dab00010da2a72f9c",
    "storageBucket": "queue-mee.appspot.com",
    "locationId": "asia-northeast3",
    "apiKey": "AIzaSyAcn5hEDkCbVF7ZE6tvBI40PzYKbbptDq4",
    "authDomain": "queue-mee.firebaseapp.com",
    "messagingSenderId": "365580319893"
})