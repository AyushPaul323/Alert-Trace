import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
function StartFirebase (){
  const firebaseConfig = {
    apiKey: "AIzaSyCc8gHKYL6B5LW-oJB4QuwCnmS3GUkn7zk",
    authDomain: "sih23-cb44e.firebaseapp.com",
    databaseURL: "https://sih23-cb44e-default-rtdb.firebaseio.com",
    projectId: "sih23-cb44e",
    storageBucket: "sih23-cb44e.appspot.com",
    messagingSenderId: "1048493484276",
    appId: "1:1048493484276:web:8720abc5520df53c7f16a1",
    measurementId: "G-753C5WGL89"
  };
const app = initializeApp(firebaseConfig);
return getDatabase(app);
}
export default StartFirebase;