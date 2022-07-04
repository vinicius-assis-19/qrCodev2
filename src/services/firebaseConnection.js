import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import "firebase/storage";

let firebaseConfig = {
    apiKey: "AIzaSyBQNMWdZFnXS663JBkAUKon-nbuG8hlUm0",
    authDomain: "cadfunc-c07fa.firebaseapp.com",
    databaseURL: "https://cadfunc-c07fa.firebaseio.com",
    projectId: "cadfunc-c07fa",
    storageBucket: "cadfunc-c07fa.appspot.com",
    messagingSenderId: "45769456339",
    appId: "1:45769456339:web:2565799d1fb7e01b89f226",
    measurementId: "G-LKFXVWVPKK"
  };  
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);        
  }
  
  firebase.app();
  
  export default firebase;