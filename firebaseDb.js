import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import '@firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDX4Zm4gEqwTu2uNh2NllORyoHRWlBiGv4",
    authDomain: "bridgellc-28c4b.firebaseapp.com",
    databaseURL: "https://bridgellc-28c4b.firebaseio.com",
    projectId: "bridgellc-28c4b",
    storageBucket: "bridgellc-28c4b.appspot.com",
    messagingSenderId: "99262629604",
    appId: "1:99262629604:web:f1f3283051271eeff14ef1",
    measurementId: "G-QZ69PEBGCQ"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.firestore();
firebase.storage();

export default firebase;