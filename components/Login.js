import React from "react";
import firebase from "firebase/app";
import Image from "next/image";
import styles from "../styles/Login.module.css";

export default function Login() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .catch((e) => {
                if (e.code === "auth/popup-blocked") {
                    firebase.auth().signInWithRedirect(provider);
                }
            });
    };

    return (
        <div className={styles['login-menu']}>
            <h2>Sign In | Sign Up</h2>
            <button onClick={signInWithGoogle}>
                <div className={styles['google-logo']}>
                    <img
                        src="../google-logo.png"
                        alt="Google Logo"
                        width="24"
                        height="24"
                    />
                </div>
                <span>
                    Google
                </span>
            </button>
            <a className={styles["login-menu-link"]} href="mailto:mail@ahmedsaed.me">Have a problem?</a>
        </div>
    );
}
