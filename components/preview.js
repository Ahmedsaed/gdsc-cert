import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

export default function Preview({ user }) {
    const [certificates, setCertificates] = useState([]);

    const [value, loading] = useDocumentDataOnce(
        firebase.firestore().collection("users").doc(user.email)
    );

    useEffect(() => {
        if (!loading && value?.cert) {
            setCertificates(
                firebase
                    .firestore()
                    .collection("certificates")
                    .where("id", "in", value.cert)
            );
        }
    }, [loading, value, user.email]);

    return (<></>)
}
