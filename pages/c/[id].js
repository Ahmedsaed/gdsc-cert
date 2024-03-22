import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRouter } from "next/router";
import Head from "next/head";
import CertificateViewer from "../../components/CertificateViewer";

export default function C(props) {
    const router = useRouter();
    const [id, setID] = useState(router.query.id);

    const [value, setValue] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined" && router.isReady) {
            setID(router.query.id);
        }
    }, [router.isReady, router.query.id]);

    useEffect(() => {
        if (typeof window !== "undefined" && id) {
            firebase
                .firestore()
                .collection("cert")
                .doc(
                    id.split("-").length > 1
                        ? id.split("-")[0]
                        : id.startsWith("omarffhj")
                        ? "omarffhj"
                        : id.startsWith("asd")
                        ? "asd"
                        : ""
                ) // This is a hard coded fix for the old certificates. (Original: id.split("-")[0])
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
                    key="title"
                />
                <meta
                    name="description"
                    content="Google Developers Student Clubs Certificate"
                    key="descripttion"
                />
                <meta property="og:type" content="article" key="og:type" />
                <meta
                    property="og:url"
                    content={`https://gdsc-certificates.web.app/c/${id}`}
                    key="og:url"
                />
                <meta
                    property="og:title"
                    content={`${value.name} - GDSC Certificate`}
                    key="og:title"
                />
                <meta
                    property="og:description"
                    content={`${value.name} - Google Develelopers Student Clubs Certificate`}
                    key="og:description"
                />
                <meta
                    property="og:image"
                    content={`https://gdsc-certificates.vercel.app/api/certThumbnail?id=${id}`}
                    key="og:image"
                />
                <meta
                    property="twitter:card"
                    content="summary_large_image"
                    key="twitter:card"
                />
                <meta
                    property="twitter:url"
                    content={`https://gdsc-certificates.web.app/c/${id}`}
                    key="twitter:url"
                />
                <meta
                    property="twitter:title"
                    content={`${value.name} - GDSC Certificate`}
                    key="twitter:title"
                />
                <meta
                    property="twitter:description"
                    content={`${value.name} - Google Develelopers Student Clubs Certificate`}
                    key="twitter:description"
                />
                <meta
                    property="twitter:image"
                    content={`https://gdsc-certificates.vercel.app/api/certThumbnail?id=${id}`}
                    key="twitter:image"
                />
                <link
                    rel="canonical"
                    href="https://gdsc-certificates.web.app/c"
                    key="canonical"
                />
            </Head>

            {id && value ? (
                <CertificateViewer
                    params={{ id, ...value }}
                ></CertificateViewer>
            ) : (
                <>Loading...</>
            )}
        </>
    ) : (
        <div>Not Found</div>
    );
}
