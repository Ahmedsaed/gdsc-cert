import Head from "next/head";
import Home from "../components/Home";

export default function HomePage() {
    return (
        <>
            <Head>
                <link rel="canonical" href="https://gdsc-certificates.web.app/" key="canonical" />
            </Head>
            <Home />
        </>
    );
}
