import { initializeApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';


    const firebaseConfig = {
        apiKey: "AIzaSyCHl66Tl14d7v83IegGMCtOnHoM84iAP6A",
        authDomain: "saylani-website-aadf0.firebaseapp.com",
        databaseURL: "https://saylani-website-aadf0-default-rtdb.firebaseio.com",
        projectId: "saylani-website-aadf0",
        storageBucket: "saylani-website-aadf0.appspot.com",
        messagingSenderId: "916307492086",
        appId: "1:916307492086:web:2046d0a0609ed0d73dc0d7"
      };
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
