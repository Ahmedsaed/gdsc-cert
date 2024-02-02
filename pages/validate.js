import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Validate.module.css";
import Head from "next/head";

export default function ValidatePage() {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const id = window.location.pathname.split("/").pop();
            setValue(id === "validate" ? "" : id);
        }
    }, []);

    const handle_id_change = (e) => {
        setValue(e.currentTarget.value);
    };

    return (
        <>
            <Head>
                <title>Validate - GDSC Certificates</title>
                <meta
                    name="title"
                    content='Validate - GDSC Certificates'
                    key="title"
                />
                <meta
                    name="description"
                    content="Validate a certificate."
                    key="descripttion"
                />
                <meta
                    property="og:url"
                    content='https://gdsc-certificates.web.app/validate'
                    key="og:url"
                />
                <meta
                    property="og:title"
                    content='Validate - GDSC Certificates'
                    key="og:title"
                />
                <meta
                    property="og:description"
                    content='Validate a certificate'
                    key="og:description"
                />
                <meta
                    property="twitter:url"
                    content='https://gdsc-certificates.web.app/validate'
                    key="twitter:url"
                />
                <meta
                    property="twitter:title"
                    content='Validate - GDSC Certificates'
                    key="twitter:title"
                />
                <meta
                    property="twitter:description"
                    content='Validate a certificate'
                    key="twitter:description"
                />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="theme-color" content="#313131" />
                <meta name="google-site-verification" content="e9K5dtnY1TbK5tWbc-cwrDoJnStqGowr6afQ5cmD4Wc" />
                <link rel="canonical" href="https://gdsc-certificates.web.app/validate" key="canonical" />
            </Head>
            <div className={styles.container}>
                <h1>Validate a certificate</h1>

                <div>
                    <input
                        className={styles.input}
                        placeholder="Enter Certificate ID"
                        value={value}
                        onChange={handle_id_change}
                    />
                    <p>
                        The Certificate ID can be found at the bottom of each certificate.
                    </p>
                </div>

                <Link passHref href={`/c/${value}`}>
                    <button variant="contained" color="primary">
                        Validate
                    </button>
                </Link>
            </div>
        </>
    );
}
