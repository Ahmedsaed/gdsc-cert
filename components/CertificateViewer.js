import React from "react";
import { jsPDF } from "jspdf";
import "svg2pdf.js";
import CertificateTemplate1 from "./cert/CertificateTemplate1";
import CertificateTemplate2 from "./cert/CertificateTemplate2";
import CertificateTemplate3 from "./cert/CertificateTemplate3";
import CertificateTemplate4 from "./cert/CertificateTemplate4";
import CertificateTemplateTopMember from "./cert/CertificateTemplateTopMember";
import CertificateTemplateTopInstructor from "./cert/CertificateTemplateTopInstructor";
import Head from "next/head";
import styles from "../styles/Certificate.module.css";
import { Canvg } from "canvg";

const saveSvgAsPng = require("save-svg-as-png");

export default function Cert({ params }) {
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

    function handleDownloadPNGBtn() {
        const svg = document.getElementById("certificate");
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const width = parseInt(svg.getAttribute("viewBox").split(" ")[2]);
        const height = parseInt(svg.getAttribute("viewBox").split(" ")[3]);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        try {
            const instance = Canvg.fromString(ctx, svgStr);
            // Renders the SVG into the canvas
            instance.render().then(() => {
                const imgData = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = imgData;
                link.download = "certificate.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        } catch (error) {
            console.log(error);
        }
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
            ) : params["certTemp"] === "top_member" ? (
                <CertificateTemplateTopMember {...params} />
            ) : params["certTemp"] === "top_instructor" ? (
                <CertificateTemplateTopInstructor {...params} />
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
