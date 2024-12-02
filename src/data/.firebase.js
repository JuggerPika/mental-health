import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDdLjZz3OrulO_xzGSCDopsX2tKTKP_HpQ",
	authDomain: "mentalhealth-9afcb.firebaseapp.com",
	projectId: "mentalhealth-9afcb",
	storageBucket: "mentalhealth-9afcb.firebasestorage.app",
	messagingSenderId: "635063323920",
	appId: "1:635063323920:web:c8d6d25e26606e6fb3e995",
	measurementId: "G-J1S4NN1VVM",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
