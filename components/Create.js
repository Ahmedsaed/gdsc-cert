import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import CertificateTemplate1 from "./cert/CertificateTemplate1";
import CertificateTemplate2 from "./cert/CertificateTemplate2";
import CertificateTemplate3 from "./cert/CertificateTemplate3";
import styles from "../styles/Create.module.css";

const year = "2023 - 2024";

export default function Create({ user }) {
    const router = useRouter();
    const [prefix, setPrefix] = useState(localStorage.getItem("prefix"));

    useEffect(() => {
        if (prefix) {
            setCertCode(generateRandomCertID(prefix));
        } else {
            router.replace(`/login?redirect=${router.asPath}`);
        }
    }, [prefix, router]);

    const [certTemp, setCertTemp] = useState("GDSC");
    const [title, setTitle] = useState(`${year} GDSC Core Team Member`);
    const [line1, setLine1] = useState(
        "is hereby awarded this Certificate of Appreciation for successfully"
    );
    const [line2, setLine2] = useState(
        "serving as a Google Developer Student Club Core Team"
    );
    const [line3, setLine3] = useState(
        `Member at GDSC MUST for the ${year} academic year.`
    );
    const [signature, setSignature] = useState("Ahmed Saed");
    const [leadUniversity, setLeadUniversity] = useState(
        "Ahmed Saed, GDSC MUST"
    );
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
    }

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
                        certTemp,
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
                {/* Certificate Template Switcher dropdown */}
                <div className={styles["cert-template-switcher"]}>
                    <label htmlFor="cert-template">Certificate Template</label>
                    <select
                        name="cert-template"
                        id="cert-template"
                        onChange={(e) => {
                            setCertTemp(e.target.value);
                        }}
                        value={certTemp}
                        className={styles.input}
                    >
                        <option value="GDSC">GDSC</option>
                        <option value="IWD">IWD</option>
                        <option value="Solution Challenge">
                            Solution Challenge
                        </option>
                    </select>
                </div>

                {!result ? (
                    <>
                        {certTemp === "GDSC" ? (
                            <CertTemp1Inputs
                                setTitle={setTitle}
                                title={title}
                                setLine1={setLine1}
                                line1={line1}
                                setLine2={setLine2}
                                line2={line2}
                                setLine3={setLine3}
                                line3={line3}
                                setSignature={setSignature}
                                signature={signature}
                                setLeadUniversity={setLeadUniversity}
                                leadUniversity={leadUniversity}
                                setDate={setDate}
                                date={date}
                                setNames={setNames}
                                names={names}
                                disabled={disabled}
                                handleCreateBtn={handleCreateBtn}
                            />
                        ) : certTemp === "IWD" ? (
                            <CertTemp2Inputs
                                setDate={setDate}
                                date={date}
                                setNames={setNames}
                                names={names}
                                disabled={disabled}
                                handleCreateBtn={handleCreateBtn}
                            />
                        ) : certTemp === "Solution Challenge" ? (
                            <CertTemp3Inputs
                                setTitle={setTitle}
                                title={title}
                                setLine1={setLine1}
                                line1={line1}
                                setSignature={setSignature}
                                signature={signature}
                                setLeadUniversity={setLeadUniversity}
                                leadUniversity={leadUniversity}
                                setDate={setDate}
                                date={date}
                                setNames={setNames}
                                names={names}
                                disabled={disabled}
                                handleCreateBtn={handleCreateBtn}
                            />
                        ) : (
                            <p>Invalid certificate template</p>
                        )}
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
                            style={{ minHeight: "200px" }}
                        />
                    </div>
                )}
            </div>
        </>
    );

    return (
        prefix && (
            <div
                className={
                    styles["cert-container"] + " container-item-full-height"
                }
            >
                {CreateCertMenu}
                <div className={styles["cert-view"]}>
                    <h2>Preview</h2>
                    {certTemp === "GDSC" ? (
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
                    ) : certTemp === "IWD" ? (
                        <CertificateTemplate2
                            id={certCode}
                            date={date}
                            name={names.split(/\r?\n/)[currentCert - 1]}
                            style={{ width }}
                        />
                    ) : certTemp === "Solution Challenge" ? (
                        <CertificateTemplate3
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
                    ) : (
                        <p>Invalid certificate template</p>
                    )}
                    <div className={styles["cert-view-controls"]}>
                        <button
                            onClick={() => {
                                setCertCode(generateRandomCertID(prefix));
                                setCurrentCert((c) => (c - 1 > 0 ? c - 1 : c));
                            }}
                        >
                            {"<"}
                        </button>
                        <p>
                            {currentCert} of {names.trim().split("\n").length}
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
        )
    );
}

function CertTemp1Inputs({
    setTitle,
    title,
    setLine1,
    line1,
    setLine2,
    line2,
    setLine3,
    line3,
    setSignature,
    signature,
    setLeadUniversity,
    leadUniversity,
    setDate,
    date,
    setNames,
    names,
    disabled,
    handleCreateBtn,
}) {
    return (
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
            <textarea
                onChange={(e) => {
                    setLeadUniversity(e.target.value);
                }}
                value={leadUniversity}
                className={styles.textBox}
                placeholder="Lead Name, University"
                style={{
                    minHeight: "100px",
                }}
            />
            <input
                onChange={(e) => {
                    setDate(e.target.value);
                }}
                value={date}
                className={styles.input}
                placeholder={new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
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
                style={{
                    minHeight: "200px",
                }}
            />
            <div className={styles["create-menu-btns"]}>
                <button disabled={disabled} onClick={handleCreateBtn}>
                    Create
                </button>
            </div>
        </>
    );
}

function CertTemp2Inputs({
    setDate,
    date,
    setNames,
    names,
    disabled,
    handleCreateBtn,
}) {
    return (
        <>
            <input
                onChange={(e) => {
                    setDate(e.target.value);
                }}
                value={date}
                className={styles.input}
                placeholder={new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
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
                style={{
                    minHeight: "200px",
                }}
            />
            <div className={styles["create-menu-btns"]}>
                <button disabled={disabled} onClick={handleCreateBtn}>
                    Create
                </button>
            </div>
        </>
    );
}

function CertTemp3Inputs({
    setTitle,
    title,
    setLine1,
    line1,
    setSignature,
    signature,
    setLeadUniversity,
    leadUniversity,
    setDate,
    date,
    setNames,
    names,
    disabled,
    handleCreateBtn,
}) {
    return (
        <>
            <input
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                value={title}
                className={styles.input}
                placeholder={`Title`}
            />
            <textarea
                onChange={(e) => {
                    setLine1(e.target.value);
                }}
                value={line1}
                className={styles.textBox}
                placeholder="Line 1"
                style={{
                    minHeight: "100px",
                }}
            />
            <input
                onChange={(e) => {
                    setSignature(e.target.value);
                }}
                value={signature}
                className={styles.input}
                placeholder="Signature"
            />
            <textarea
                onChange={(e) => {
                    setLeadUniversity(e.target.value);
                }}
                value={leadUniversity}
                className={styles.textBox}
                placeholder="Lead Name, University"
                style={{
                    minHeight: "100px",
                }}
            />
            <input
                onChange={(e) => {
                    setDate(e.target.value);
                }}
                value={date}
                className={styles.input}
                placeholder={new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
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
                style={{
                    minHeight: "200px",
                }}
            />
            <div className={styles["create-menu-btns"]}>
                <button disabled={disabled} onClick={handleCreateBtn}>
                    Create
                </button>
            </div>
        </>
    );
}
