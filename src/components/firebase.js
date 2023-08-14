import { initializeApp } from "firebase/app";
import  {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"

import  {getFirestore} from "firebase/firestore"
const firebaseConfig = {
     apiKey: "AIzaSyAgDTCHW5QqxkQkLZJ2dd7P6DK-u8yC6l8",
    authDomain: "wetalk-c0c9d.firebaseapp.com",
    projectId: "wetalk-c0c9d",
    storageBucket: "wetalk-c0c9d.appspot.com",
    messagingSenderId: "859748410970",
    appId: "1:859748410970:web:dc17d700a66553e2f69a63",
    measurementId: "G-0RFC95FLRN"};
const app = initializeApp(firebaseConfig);
export  const  auth =getAuth(app)
export  const googleprovider = new GoogleAuthProvider()
export  const facebookprovider = new FacebookAuthProvider()
export const  database = getFirestore(app)