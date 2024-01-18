import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Create from "../components/Create";
import Login from "../components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";

const auth = firebase.auth();

export default function CreatePage() {
    const [user, loading] = useAuthState(auth);

    return <>
        <Head>
            <title>Create - GDSC Certificates</title>
            <meta
                name="title"
                content='Create - GDSC Certificates'
                key="title"
            />
            <meta
                name="description"
                content="Easily create certificates for your members."
                key="descripttion"
            />
            <meta
                property="og:url"
                content='https://gdsc-certificates.web.app/create'
                key="og:url"
            />
            <meta
                property="og:title"
                content='Create - GDSC Certificates'
                key="og:title"
            />
            <meta
                property="og:description"
                content='Easily create certificates for your members.'
                key="og:description"
            />
            <meta
                property="twitter:url"
                content='https://gdsc-certificates.web.app/create'
                key="twitter:url"
            />
            <meta
                property="twitter:title"
                content='Create - GDSC Certificates'
                key="twitter:title"
            />
            <meta
                property="twitter:description"
                content='Easily create certificates for your members.'
                key="twitter:description"
            />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#313131" />
            <meta name="google-site-verification" content="e9K5dtnY1TbK5tWbc-cwrDoJnStqGowr6afQ5cmD4Wc" />
            <link rel="canonical" href="https://gdsc-certificates.web.app/create" key="canonical" />
        </Head>
        {loading ? (
            <div>Loading...</div>
        ) : user?.email ? (
            <Create user={user} />
        ) : (
            <Login />
        )}
    </>

}
