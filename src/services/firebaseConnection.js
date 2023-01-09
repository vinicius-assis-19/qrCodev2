import firebase, { storage } from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import  "firebase/storage";

let firebaseConfig = {

  };  
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);        
  }
  
  firebase.app();
  
  export default firebase;