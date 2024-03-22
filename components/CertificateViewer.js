import React from "react";
import { jsPDF } from "jspdf";
import "svg2pdf.js";
import CertificateTemplate1 from "./cert/CertificateTemplate1";
import CertificateTemplate2 from "./cert/CertificateTemplate2";
import CertificateTemplate3 from "./cert/CertificateTemplate3";
import CertificateTemplate4 from "./cert/CertificateTemplate4";
import Head from "next/head";
import styles from "../styles/Certificate.module.css";

const saveSvgAsPng = require("save-svg-as-png");

export default function Cert({ params }) {
    function handleDownloadPNGBtn() {
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

    function handleDownloadPDFBtn() {
        const svg = document.getElementById("certificate");
        const width = parseInt(svg.getAttribute("viewBox").split(" ")[2]);
        const height = parseInt(svg.getAttribute("viewBox").split(" ")[3]);

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [width, height],
        });

        const Karam = fetch(
            "https://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjDY_Z4sK0.woff2"
        )
            .then((response) => response.blob())
            .then((blob) => {
                doc.addFileToVFS("Karma.woff2", blob);
                doc.addFont("Karma.woff2", "Karam", "normal");
                doc.svg(svg, {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    loadExternalStyleSheets: true,
                }).then(() => {
                    doc.save("certificate.pdf");
                });
            });
    }

    return (
        <div className={styles["cert-viewer"]}>
            <Head>
                <meta name="color-scheme" content="normal" />
            </Head>
            {params["certTemp"] === "GDSC" ? (
                <CertificateTemplate1 {...params} />
            ) : params["certTemp"] === "IWD" ? (
                <CertificateTemplate2 {...params} />
            ) : params["certTemp"] === "Solution Challenge" ? (
                <CertificateTemplate3 {...params} />
            ) : params["certTemp"] === "Web Development Bootcamp" ? (
                <CertificateTemplate4 {...params} />
            ) : (
                <CertificateTemplate1 {...params} />
            )}
            <div className={styles["btn-group"]}>
                <button
                    className={styles["download-btn"]}
                    onClick={handleDownloadPNGBtn}
                >
                    Download PNG
                </button>
                {/* <button
                    className={styles["download-btn"]}
                    onClick={handleDownloadPDFBtn}
                >
                    Download PDF
                </button> */}
            </div>
        </div>
    );
}
