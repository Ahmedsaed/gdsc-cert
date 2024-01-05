import React from "react";
import styles from "../styles/Login.module.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Logout() {
	const auth = firebase.auth();
    const [user, loading] = useAuthState(auth);

	const signOut = () => {
		firebase.auth().signOut();
	};

	return user && (
		<>
			<button
				onClick={signOut}
				className={styles['logout-btn']}
			>Sign Out</button>
		</>
	);
}
