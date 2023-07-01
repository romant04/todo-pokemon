import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const config = {
    apiKey: 'AIzaSyBSD9NKPRFLuZ84zlhk6erQ2_a3D1acmq0',
    authDomain: 'todo-pokemon.firebaseapp.com',
    projectId: 'todo-pokemon',
    storageBucket: 'todo-pokemon.appspot.com',
    messagingSenderId: '237008819026',
    appId: '1:237008819026:web:81da1b66b751bbf806608b',
    measurementId: 'G-360B5CC2TT',
}

firebase.initializeApp(config)

export default firebase.firestore()
