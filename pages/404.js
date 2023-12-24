import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Head from "next/head";
import Cert from "../components/cert";

export default function CertPage() {
    const [id, setID] = useState("");
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [value, setValue] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.location.pathname.startsWith("/c/")) {
                const id = window.location.pathname.split("/")[2];

                setID(id);
                firebase
                    .firestore()
                    .collection("cert")
                    .doc(id.substring(0, 2))
                    .collection("core21")
                    .doc(id)
                    .get()
                    .then((doc) => {
                        setValue(doc.data());
                        setLoading(false);
                    });
            } else {
                setNotFound(true);
                setLoading(false);
            }
        }
    }, []);

    return loading ? (
        <>Loading...</>
    ) : notFound ? (
        <>Page Not Found</>
    ) : value ? (
        <Cert id={id} {...value} />
    ) : (
      <>Certificate Not Found. If you have just created the new certificate, please wait for 2 minutes</>
    );
}
