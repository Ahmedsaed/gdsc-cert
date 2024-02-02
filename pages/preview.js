import firebase from "firebase/app";
import Head from "next/head";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";
import Preview from "../components/Preview";

const auth = firebase.auth();

export default function PreviewPage(props) {
    const [user, loading] = useAuthState(auth);

    return <>
        <Head>
            <title>Preview - GDSC Certificates</title>
            <meta
                name="title"
                content='Preview - GDSC Certificates'
                key="title"
            />
            <meta
                name="description"
                content="Preview created certificates."
                key="descripttion"
            />
            <meta
                property="og:url"
                content='https://gdsc-certificates.web.app/preview'
                key="og:url"
            />
            <meta
                property="og:title"
                content='Preview - GDSC Certificates'
                key="og:title"
            />
            <meta
                property="og:description"
                content='Preview created certificates.'
                key="og:description"
            />
            <meta
                property="twitter:url"
                content='https://gdsc-certificates.web.app/preview'
                key="twitter:url"
            />
            <meta
                property="twitter:title"
                content='Preview - GDSC Certificates'
                key="twitter:title"
            />
            <meta
                property="twitter:description"
                content='Preview created certificates.'
                key="twitter:description"
            />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#313131" />
            <meta name="google-site-verification" content="e9K5dtnY1TbK5tWbc-cwrDoJnStqGowr6afQ5cmD4Wc" />
            <link rel="canonical" href="https://gdsc-certificates.web.app/preview" key="canonical" />
        </Head>
        {loading ? (
            <div>Loading...</div>
        ) : user?.email ? (
            <Preview user={user} />
        ) : (
            <Login />
        )}
    </>

}
