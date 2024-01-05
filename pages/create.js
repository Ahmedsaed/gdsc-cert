import React, { useEffect } from "react";
import Create from "../components/create";
import Login from "../components/login";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

export default function App() {
    const [user, loading] = useAuthState(auth);

    return loading ? (
        <div>Loading...</div>
    ) : user?.email ? (
        <Create user={user} />
    ) : (
        <Login />
    );
}
