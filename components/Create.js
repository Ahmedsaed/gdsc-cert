import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import CertificateTemplate1 from "./cert/CertificateTemplate1";
import styles from "../styles/Create.module.css";

const year = "2023 - 2024";

export default function Create({ user }) {
    const [value, loading] = useDocumentDataOnce(
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

    useEffect(() => {
        if (!loading && !value?.cert) {
            const db = firebase.firestore();
            // Get a new write batch
            var batch = db.batch();
            let certRef = db
                .collection("users")
                .doc(user.email);
            batch.set(certRef, { cert: generateRandomUserID() });

            // Commit the batch
            batch.commit();

            // wait and reload component
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }

        if (!loading && value?.cert) {
            setCertCode(generateRandomCertID(value?.cert));
        }
    }, [loading, value, user.email]);

    const prefix = value?.cert;
    const [title, setTitle] = useState(`${year} GDSC Core Team Member`);
    const [line1, setLine1] = useState("is hereby awarded this Certificate of Appreciation for successfully");
    const [line2, setLine2] = useState("serving as a Google Developer Student Club Core Team Member at");
    const [line3, setLine3] = useState(`GDSC MUST for the ${year} academic year.`);
    const [signature, setSignature] = useState("Ahmed Saed");
    const [leadUniversity, setLeadUniversity] = useState("Ahmed Saed, GDSC MUST");
    const [names, setNames] = useState("");
    const [date, setDate] = useState(
        new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    );

    const [result, setResult] = useState("");
    const [disabled, setDisabled] = useState(false);

    function generateRandomCertID(prefix) {
        let text = prefix + "-";
        const possible =
            "0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789";

        for (let i = 0; i < 10; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }
        return text;
    };

    const [certCode, setCertCode] = useState(generateRandomCertID(prefix));
    const [currentCert, setCurrentCert] = useState(1);
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

    function handleCreateBtn() {
        setDisabled(true);
        const db = firebase.firestore();
        names.split(/\r?\n/).forEach((name) => {
            const id1 = generateRandomCertID(prefix);
            let certRef = db
                .collection("cert")
                .doc(prefix)
                .collection("core21")
                .doc(id1);

            db.runTransaction((transaction) => {
                return transaction.get(certRef).then((cert) => {
                    if (cert.exists) {
                        throw new Error("Document does exist!");
                    }
                    transaction.set(certRef, {
                        title,
                        line1,
                        line2,
                        name,
                        line3,
                        signature,
                        date,
                        leadUniversity,
                        created:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    return {
                        name,
                        id1,
                    };
                });
            })
                .then(({ name, id1 }) => {
                    const finalResult = `${name}\r\nhttps://${window.location.host}/c/${id1}\r\n`;
                    setResult((r) => r + finalResult);
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    const CreateCertMenu = (
        <>
            <div className={styles["create-menu"]}>
                <h2>Create new certificates</h2>
                {!result ? (
                    <>
                        <input
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            value={title}
                            className={styles.input}
                            placeholder={`Title`}
                        />
                        <input
                            onChange={(e) => {
                                setLine1(e.target.value);
                            }}
                            value={line1}
                            className={styles.input}
                            placeholder="Line 1"
                        />
                        <input
                            onChange={(e) => {
                                setLine2(e.target.value);
                            }}
                            value={line2}
                            className={styles.input}
                            placeholder="Line 2"
                        />
                        <input
                            onChange={(e) => {
                                setLine3(e.target.value);
                            }}
                            value={line3}
                            className={styles.input}
                            placeholder={`Line 3`}
                        />
                        <input
                            onChange={(e) => {
                                setSignature(e.target.value);
                            }}
                            value={signature}
                            className={styles.input}
                            placeholder="Signature"
                        />
                        <input
                            onChange={(e) => {
                                setLeadUniversity(e.target.value);
                            }}
                            value={leadUniversity}
                            className={styles.input}
                            placeholder="Lead Name, University"
                        />
                        <input
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                            value={date}
                            className={styles.input}
                            placeholder={new Date().toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )}
                        />
                        <textarea
                            onChange={(e) => {
                                setNames(e.target.value);
                            }}
                            value={names}
                            spellCheck="false"
                            className={styles.textBox}
                            placeholder={
                                "Core Member1\r\nCore Member2\r\nCore Member3\r\n\r\nYou can create multiple certificates at once by entering the names of the members and clicking on the 'Create' button"
                            }
                        />
                        <div className={styles["create-menu-btns"]}>
                            <button
                                disabled={disabled}
                                onClick={handleCreateBtn}
                            >
                                Create
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={styles["share-menu"]}>
                        <p>
                            Certificates created successfully. You can copy the
                            links below and send them to the members.
                        </p>
                        <p>
                            You can access the certificates again by visiting
                            the certificates page.
                        </p>
                        <span>
                            <b>Certificates: </b>
                        </span>
                        <textarea
                            label="Results"
                            value={result}
                            className={styles.textBox}
                            spellCheck="false"
                        />
                    </div>
                )}
            </div>
        </>
    );

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : prefix ? (
                <div
                    className={
                        styles["cert-container"] + " container-item-full-height"
                    }
                >
                    {CreateCertMenu}
                    <div className={styles["cert-view"]}>
                        <h2>Preview</h2>
                        <CertificateTemplate1
                            id={certCode}
                            title={title}
                            line1={line1}
                            line2={line2}
                            line3={line3}
                            signature={signature}
                            leadUniversity={leadUniversity}
                            date={date}
                            name={names.split(/\r?\n/)[currentCert - 1]}
                            style={{ width }}
                        />
                        <div className={styles["cert-view-controls"]}>
                            <button
                                onClick={() => {
                                    setCertCode(generateRandomCertID(prefix));
                                    setCurrentCert((c) =>
                                        c - 1 > 0 ? c - 1 : c
                                    );
                                }}
                            >
                                {"<"}
                            </button>
                            <p>
                                {currentCert} of{" "}
                                {names.trim().split("\n").length}
                            </p>
                            <button
                                onClick={() => {
                                    setCertCode(generateRandomCertID(prefix));
                                    setCurrentCert((c) =>
                                        c + 1 <= names.trim().split("\n").length
                                            ? c + 1
                                            : c
                                    );
                                }}
                            >
                                {">"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    Creating Account. This shouldn&apos;t take long.
                </>
            )}
        </>
    );
}
