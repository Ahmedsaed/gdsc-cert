import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import styles from "../styles/Preview.module.css";
import GDSCCoreTeamCertification2021 from "./cert/GDSCCoreTeamCertification2021";


export default function Preview({ user }) {
    const [certificates, setCertificates] = useState([]);
    const [currentCert, setCurrentCert] = useState({});

    const [value, loading] = useDocumentDataOnce(
        firebase.firestore().collection("users").doc(user.email)
    );

    const [width, setWidth] = useState(300);
    useEffect(() => {
        function handleResize() {
            if (typeof window !== "undefined") {
                setWidth((window.innerWidth - 500) * 0.9);
            }
        }

        setWidth((window.innerWidth - 500) * 0.9);

        // Attach the event listener to the window object
        window.addEventListener("resize", handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!loading && value?.cert) {
            async function getCert() {
                const cert_docs = await firebase
                                    .firestore()
                                    .collection("cert")
                                    .doc(value.cert)
                                    .collection("core21")
                                    .get()

                const cert_data = cert_docs.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });

                setCertificates(cert_data);
            }

            getCert();
        }
    }, [loading, value, user.email]);

    const CertificateList = certificates.map((cert) => {
        return (
            <div key={cert.id + '-button'} className={styles['cert-btn-group'] + ' ' +  (currentCert.id === cert.id ? styles['selected'] : '')}>
                <button
                    onClick={() => {
                        setCurrentCert(cert);
                    }}
                >
                    {cert.name}
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `${window.location.origin}/cert/${cert.id}`
                        );
                    }}
                >
                    🔗
                </button>
                <button
                    onClick={() => {
                        firebase
                            .firestore()
                            .collection("cert")
                            .doc(value.cert)
                            .collection("core21")
                            .doc(cert.id)
                            .delete();

                        setCertificates(certificates.filter((c) => c.id !== cert.id));
                    }}
                >
                    🗑
                </button>
            </div>
        );
    });

    const RequestAdminMenu = (
        <div className={styles["request-access-menu"]}>
            <h2>Request Admin Access</h2>
            <p>
                {`You don't have admin rights`}
                <br />
                {`Contact Ahmed Saed, your Email : `}
                <br />
                {`${user.email}`}
            </p>
            <button
                onClick={() => {
                    firebase.auth().signOut();
                }}
            >
                Log out
            </button>
        </div>
    );

    return (
        <>
            {loading ? (
                <div></div>
            ) : certificates ? (
                <div
                    className={
                        styles["cert-container"] + " container-item-full-height"
                    }
                >
                    <div className={styles['cert-list']}>
                        <h2>View Certificate</h2>
                        <div className={styles["cert-list-wrapper"]}>
                            {CertificateList}
                        </div>
                    </div>
                    <div className={styles["cert-view"]}>
                        <h2>Preview</h2>
                        <GDSCCoreTeamCertification2021
                            id={currentCert.id}
                            title={currentCert.title}
                            line1={currentCert.line2}
                            line2={currentCert.line2}
                            line3={currentCert.line3}
                            signature={currentCert.signature}
                            leadUniversity={currentCert.leadUniversity}
                            date={currentCert.date}
                            name={currentCert.name}
                            style={{ width }}
                        />
                    </div>
                </div>
            ) : (
                RequestAdminMenu
            )}
        </>
    )
}
