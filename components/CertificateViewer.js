import React, { useEffect, useState } from "react";
import CertificateTemplate1 from "./cert/CertificateTemplate1";
import Head from "next/head";
import styles from "../styles/Certificate.module.css"

const saveSvgAsPng = require("save-svg-as-png");

export default function Cert({params}) {
    const [width, setWidth] = useState(null);

    useEffect(() => {
        function handleResize() {
            if (typeof window !== "undefined") {
                setWidth(window.innerWidth * 0.8);
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

    function handleDownloadBtn() {
        saveSvgAsPng.saveSvgAsPng(
            document.getElementById("certificate"),
            "certificate.png",
            {
                scale: 2,
                encoderOptions: 1,
                backgroundColor: "white",
            }
        );
    }

    return width ? (
        <div
            className={styles['cert-viewer']}
            style={{ width: width * 0.9 }}
        >
            <Head>
                <meta name="color-scheme" content="normal" />
            </Head>
            <CertificateTemplate1
                {...params}
                style={{ width: width * 0.9 }}
            />
            <div>
                <button
                    className={styles['download-btn']}
                    onClick={handleDownloadBtn}
                >
                    Download
                </button>
            </div>
        </div>
    ) : (
        <>
            <h1>
                Please use a browser that supports SVGs, like Chrome, Firefox,
                or Safari.
            </h1>
        </>
    );
}
