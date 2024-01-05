import React, { useEffect } from "react";
import firebase from "firebase/app";
import Login from "../components/login";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Preview from "../components/preview";

const auth = firebase.auth();

export default function App(props) {
    const [user, loading] = useAuthState(auth);

    return loading ? (
        <div>Loading...</div>
    ) : user?.email ? (
        <Preview user={user} />
    ) : (
        <Login />
    );
}
