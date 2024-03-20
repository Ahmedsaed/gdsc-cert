import React, { useEffect, useState } from "react";
import CertificateTemplate1 from "./cert/CertificateTemplate1";
import CertificateTemplate2 from "./cert/CertificateTemplate2";
import CertificateTemplate3 from "./cert/CertificateTemplate3";
import Head from "next/head";
import styles from "../styles/Certificate.module.css";

const saveSvgAsPng = require("save-svg-as-png");

export default function Cert({ params }) {
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
                scale: 1,
                encoderOptions: 1,
                backgroundColor: "white",
                fonts: [
                    {
                        url: "https://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjDY_Z4sK0.woff2",
                        text: `
                            @font-face {
                                font-family: 'Karma';
                                font-style: normal;
                                font-weight: 300;
                                font-display: swap;
                                src: url(https://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjDY_Z4sK0.woff2) format('woff2');
                                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                            }
                        `,
                    },
                ],
            }
        );
    }

    return width ? (
        <div className={styles["cert-viewer"]} style={{ width: width * 0.9 }}>
            <Head>
                <meta name="color-scheme" content="normal" />
            </Head>
            {params["certTemp"] === "GDSC" ? (
                <CertificateTemplate1
                    {...params}
                    style={{ width: width * 0.9 }}
                />
            ) : params["certTemp"] === "IWD" ? (
                <CertificateTemplate2
                    {...params}
                    style={{ width: width * 0.9 }}
                />
            ) : params["certTemp"] === "Solution Challenge" ? (
                <CertificateTemplate3
                    {...params}
                    style={{ width: width * 0.9 }}
                />
            ) :
                params["certTemp"] === "Web Development Bootcamp" ? (
                    <CertificateTemplate4
                        {...params}
                        style={{ width: width * 0.9 }}
                    />
                ) :
                    (

                        <CertificateTemplate1
                            {...params}
                            style={{ width: width * 0.9 }}
                        />
                    )}
            <div>
                <button
                    className={styles["download-btn"]}
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
