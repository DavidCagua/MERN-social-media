import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDjjYV6XiE38idt2vwF-SpxKcGSwSdLhzc",
    authDomain: "fir-auth-7def1.firebaseapp.com",
    databaseURL: "https://fir-auth-7def1.firebaseio.com",
    projectId: "fir-auth-7def1",
    storageBucket: "fir-auth-7def1.appspot.com",
    messagingSenderId: "875734736897",
    appId: "1:875734736897:web:34731e10ef5c50a909e000",
    measurementId: "G-KS3ND4EZ3X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;