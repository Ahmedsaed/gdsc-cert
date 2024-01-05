import { useEffect, useState } from "react";
import Cert from "../../components/cert";
import Head from "next/head";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRouter } from "next/router";

export default function C(props) {
    const router = useRouter();
    const [id, setID] = useState(router.query.id);

    const [value, setValue] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined" && router.isReady) {
            setID(router.query.id);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (typeof window !== "undefined" && id) {
            firebase
                .firestore()
                .collection("cert")
                .doc(id.split("-")[0])
                .collection("core21")
                .doc(id)
                .get()
                .then((doc) => {
                    setValue(doc.data());
                });
        }
    }, [id]);

    return value ? (
        <>
            <Head>
                <title>{`${value.name} - GDSC Certificate`}</title>
                <meta
                    name="title"
                    content={`${value.name} - GDSC Certificate`}
                />
                <meta
                    name="description"
                    content={`Google Developers Student Clubs Certificate`}
                />
                <meta property="og:type" content="article" />
                <meta
                    property="og:url"
                    content={`https://gdsc23-cert.web.app/c/${value.id}`}
                />
                <meta
                    property="og:title"
                    content={`${value.name} - GDSC Certificate`}
                />
                <meta
                    property="og:description"
                    content={`${value.name} - Google Develelopers Student Clubs Certificate`}
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content={`https://gdsc23-cert.web.app/c/${value.id}`}
                />
                <meta
                    property="twitter:title"
                    content={`${value.name} - GDSC Certificate`}
                />
                <meta
                    property="twitter:description"
                    content={`${value.name} - Google Develelopers Student Clubs Certificate`}
                />
            </Head>

            {id ? <Cert params={{ id, ...value }}></Cert> : <></>}
        </>
    ) : (
      <div >Not Found</div>
    );
}
