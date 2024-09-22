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
        if (typeof window === "undefined" || !id) return;

        if (["IQ55", "334C"].includes(id.split("-")[0])) {
            // This is a hard coded fix for accounts that were accidentally deleted.
            setValue({
                accidentallyDeleted: true,
            });
        } else {
            try {
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
                        const data = doc.data();
                        if (data)
                            setValue(doc.data());
                        else
                            setValue({
                                errored: true,
                            });
                    })
                    .catch((e) => {
                        setValue({
                            errored: true,
                        });
                    });
            }
            catch (e) {
                setValue({
                    errored: true
                })
            }
        }
    }, [id]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", textAlign: "center" }}>
            {value && Object.keys(value).length > 0 && !value.errored ? (
                <>
                    <Head>
                        <title>{`$GDSC Certificate`}</title>
                        <meta
                            name="title"
                            content={`$GDSC Certificate`}
                            key="title"
                        />
                        <meta
                            name="description"
                            content="Google Developers Student Clubs Certificate"
                            key="description"
                        />
                        <meta property="og:type" content="article" key="og:type" />
                        <meta
                            property="og:url"
                            content={`https://gdsc-certificates.web.app/c/${id}`}
                            key="og:url"
                        />
                        <meta
                            property="og:title"
                            content={`$GDSC Certificate`}
                            key="og:title"
                        />
                        <meta
                            property="og:description"
                            content={`$Google Developers Student Clubs Certificate`}
                            key="og:description"
                        />
                        <meta
                            property="og:image"
                            content={`https://gdsc-certificates.web.app/api/certThumbnail?id=${id}`}
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
                            content={`$GDSC Certificate`}
                            key="twitter:title"
                        />
                        <meta
                            property="twitter:description"
                            content={`$Google Developers Student Clubs Certificate`}
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

                    {id && value && value.accidentallyDeleted ? (
                        <>
                            This certificate was accidentally deleted. But it was a
                            valid certificate. If you are the owner of this certificate,
                            please contact me at mail@ahmedsaed.me
                        </>
                    ) : (
                        <CertificateViewer
                            params={{ id, ...value }}
                        />
                    )}
                </>
            ) : !value.errored ? (
                <div>Loading...</div>
            ) : (
                <div>Not Found</div>
            )}
        </div>
    );
}
