import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Validate.module.css";

export default function Validate() {
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
        <div className={styles.container}>
            <h1>Verify a certificate</h1>

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

            <Link href={`/c/${value}`}>
                <button variant="contained" color="primary">
                    Validate
                </button>
            </Link>
        </div>
    );
}
