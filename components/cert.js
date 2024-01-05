import React, { useEffect, useState } from "react";
import GDSCCoreTeamCertification2021 from "./cert/GDSCCoreTeamCertification2021";
import Head from "next/head";

const saveSvgAsPng = require("save-svg-as-png");

export default function Cert({params}) {
    const [width, setWidth] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth > 1600 ? 1600 : window.innerWidth);
        }
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
            style={{
                width: width * 0.9,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Head>
                <meta name="color-scheme" content="normal" />
                <style>{"body { background-color: #9e9e9e; }"}</style>
            </Head>
            <GDSCCoreTeamCertification2021
                {...params}
                style={{ width: width * 0.9 }}
            />
            <div>
                <button
                    style={{
                        backgroundColor: "#0f9d58",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        marginTop: "20px",
                    }}
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
