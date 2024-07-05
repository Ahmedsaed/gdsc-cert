import "../styles/globals.css";
import firebase from "firebase/app";
import "firebase/analytics";
import Head from "next/head";
import { useEffect } from "react";
import Logout from "../components/Logout";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyDWALFZGP9D_NnvqA6vo49ciD3F6Fp0r5g",
        authDomain: "gdsc23-cert.firebaseapp.com",
        projectId: "gdsc23-cert",
        storageBucket: "gdsc23-cert.appspot.com",
        messagingSenderId: "975277348569",
        appId: "1:975277348569:web:9b4e42a8a96de3ade510c8",
        measurementId: "G-QD3L40GXFF",
    });
}

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        firebase.analytics();
    }, []);

    return (
        <>
            <Head>
                <title>GDSC Certificates</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#845c5c"
                />
                <meta
                    name="title"
                    content="Certificate Generator - Google Developers Student Clubs"
                    key="title"
                />
                <meta
                    name="description"
                    content="Certificate management web app. Create, Verify and Share Certificates."
                    key="descripttion"
                />
                <meta property="og:type" content="website" key="og:type" />
                <meta
                    property="og:url"
                    content="https://gdsc-certificates.web.app/"
                    key="og:url"
                />
                <meta
                    property="og:title"
                    content="Certificate Generator - Google Developers Student Clubs"
                    key="og:title"
                />
                <meta
                    property="og:description"
                    content="Certificate management web app. Create, Verify and Share Certificates."
                    key="og:description"
                />
                <meta
                    property="twitter:card"
                    content="summary_large_image"
                    key="twitter:card"
                />
                <meta
                    property="twitter:url"
                    content="https://gdsc-certificates.web.app/"
                    key="twitter:url"
                />
                <meta
                    property="twitter:title"
                    content="Certificate Generator - Google Developers Student Clubs"
                    key="twitter:title"
                />
                <meta
                    property="twitter:description"
                    content="Certificate management web app. Create, Verify and Share Certificates."
                    key="twitter:description"
                />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="theme-color" content="#313131" />
                <meta
                    name="google-site-verification"
                    content="e9K5dtnY1TbK5tWbc-cwrDoJnStqGowr6afQ5cmD4Wc"
                />
            </Head>
            <div className="container">
                <Logout />
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;
