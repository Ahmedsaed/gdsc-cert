import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Create from "../components/Create";
import Login from "../components/Login";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

export default function CreatePage() {
    const [user, loading] = useAuthState(auth);

    return loading ? (
        <div>Loading...</div>
    ) : user?.email ? (
        <Create user={user} />
    ) : (
        <Login />
    );
}
