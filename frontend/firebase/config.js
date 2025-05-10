import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAkXlDZ2bG100XddaqtxYUF7V_UpRW35OI",
  authDomain: "raahein-auth.firebaseapp.com",
  projectId: "raahein-auth",
  storageBucket: "raahein-auth.appspot.com",
  messagingSenderId: "795509132094",
  appId: "1:795509132094:web:5de8ba867fbfa79b4ffa6f",
  measurementId: "G-GC8ENNPQQC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let analytics = null;

// Check if we're on the client and analytics is supported
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, analytics };
