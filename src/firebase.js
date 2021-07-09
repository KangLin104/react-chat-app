import firebase from 'firebase/app';
import "firebase/auth";

const app= firebase.initializeApp({
    apiKey: "AIzaSyBn3VfX51TSYYt23iemXF4vm5JRYZC57LQ",
    authDomain: "chat-app-ad3e5.firebaseapp.com",
    projectId: "chat-app-ad3e5",
    storageBucket: "chat-app-ad3e5.appspot.com",
    messagingSenderId: "147511768236",
    appId: "1:147511768236:web:e803a834172fec9b7f5b09",
    measurementId: "G-3FJMY44SJF"
  })
export const auth=app.auth();
export default app;