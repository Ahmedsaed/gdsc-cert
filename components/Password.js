import React, { useState } from "react";
import firebase from "firebase/app";
import styles from "../styles/Login.module.css";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

export default function Password({ user }) {
    const [password, setPassword] = React.useState("");
	const [user_cert, loading] = useDocumentDataOnce(
        firebase.firestore().collection("users").doc(user.email)
    );

	function generateRandomUserID() {
        let text = "";
        const possible =
            "0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789";

        for (let i = 0; i < 4; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }
        return text;
    }

	function validatePassword() {
		if (password === Buffer.from(process.env.NEXT_PUBLIC_PASSWORD, "base64").toString('utf-8')) {
			if (!user_cert?.cert) {
				const db = firebase.firestore();
				const cert_id = generateRandomUserID();
				// Get a new write batch
				var batch = db.batch();
				let certRef = db
					.collection("users")
					.doc(user.email);
				batch.set(certRef, { cert: cert_id });

				// Commit the batch
				batch.commit();

				localStorage.setItem("prefix", cert_id);
			} else {
				localStorage.setItem("prefix", user_cert?.cert);
				window.location.reload();
			}
		}
		else {
			alert("Wrong Password");
		}
	}

    return !loading && (
        <div className={styles['login-menu']}>
            <h2>Lead Password</h2>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				minLength="8"
				className={styles["input"]}
			/>
            <button onClick={validatePassword}>
                <span>
                    Submit
                </span>
            </button>
			<a className={styles["login-menu-link"]} target="_blank" href="https://gdsc-slack.slack.com/archives/CK579J14Z/p1704982425998279">
				<span
					title="The password is shared in the #general channel in the Google Developer Student Clubs Slack workspace. All leads should have access to that workspace"
				>
					View the password
				</span>
			</a>
			<a className={styles["login-menu-link"]} target="_blank" href="mailto:mail@ahmedsaed.me">Have a problem?</a>
        </div>
    );
}
