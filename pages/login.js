import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";
import Password from "../components/Password";

const auth = firebase.auth();

export default function CreatePage() {
    const [user, loading] = useAuthState(auth);
	const [prefix, setPrefix] = useState("");
	const router = useRouter();

	useEffect(() => {
		const { redirect } = router.query;

		setPrefix(localStorage.getItem("prefix") || "");
		if (!loading && user?.email && prefix) {
			if (redirect)
				router.replace(redirect.toString());
			else
				router.replace('/');
		}
	}, [loading, user?.email, prefix]);

    return loading ? (
        <div>Loading...</div>
    ) : !user?.email ? (
        <Login />
    ) : !prefix ? (
		<Password user={user} />
	) : (
		<>Logged In. You should have been redirected to the home page</>
	);
}
