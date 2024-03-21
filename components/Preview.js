import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import styles from "../styles/Preview.module.css";
import CertificateTemplate1 from "./cert/CertificateTemplate1";


export default function Preview() {
    const router = useRouter();
    const [prefix, setPrefix] = useState(localStorage.getItem("prefix"));

    useEffect(() => {
        if (prefix) {
            async function getCert() {
                const cert_docs = await firebase
                                    .firestore()
                                    .collection("cert")
                                    .doc(prefix)
                                    .collection("core21")
                                    .get()

                const cert_data = cert_docs.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });

                setCertificates(cert_data);
                setCurrentCert(cert_data[0] ?? {});
            }

            getCert();
        } else {
            router.replace(`/login?redirect=${router.asPath}`);
        }
    }, [prefix, router]);

    const [certificates, setCertificates] = useState([]);
    const [currentCert, setCurrentCert] = useState({});
    const [width, setWidth] = useState(300);
    useEffect(() => {
        function handleResize() {
            if (typeof window !== "undefined") {
                setWidth((window.innerWidth - 500) * 0.9);
            }
        }

        handleResize();

        // Attach the event listener to the window object
        window.addEventListener("resize", handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                            `${window.location.origin}/c/${cert.id}`
                        );
                    }}
                >
                    <i className="fa-solid fa-link"></i>
                </button>
                <button
                    onClick={() => {
                        firebase
                            .firestore()
                            .collection("cert")
                            .doc(prefix)
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

    return certificates && (
        <div
            className={
                styles["cert-container"] + " container-item-full-height"
            }
        >
            <div className={styles['cert-list']}>
                <h2>View Certificate</h2>
                <div className={styles["cert-list-wrapper"]}>
                    {certificates.length === 0 && (
                        <p><b>No Certificates</b></p>
                    )}
                    {CertificateList}
                </div>
            </div>
            <div className={styles["cert-view"]}>
                <h2>Preview</h2>
                <CertificateTemplate1
                    {...currentCert}
                    style={{ width }}
                />
            </div>
        </div>
    )
}
