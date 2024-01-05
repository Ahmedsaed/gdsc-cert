import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Image src="/gdsc-white.png" width="340" height="54" alt='logo' /> {/* h: 22 */}
                <p className={styles.description}>Certificates🎉</p>
                <div className={styles.grid}>
                    <Link href="/create">
                        <a className={styles.card}>
                            <h2>Create Certificates &rarr;</h2>
                            <p>
                                Create a new certificate <br/>(Leads Only)
                            </p>
                        </a>
                    </Link>
                    <Link href="/preview">
                        <a className={styles.card}>
                            <h2>Preview Certificates &rarr;</h2>
                            <p>
                                Browse the certificates you created before
                            </p>
                        </a>
                    </Link>
                    <Link href="/validate">
                        <a className={styles.card}>
                            <h2>Validate Certificate &rarr;</h2>
                            <p>
                                Verify the authenticity of a certificate by
                                it&apos;s code{" "}
                            </p>
                        </a>
                    </Link>
                    <a
                        href="https://www.linkedin.com/in/ahmedsaed26/"
                        className={styles.card}
                    >
                        <h2>More About &rarr;</h2>
                        <p>Contact the maintainer and check more projects</p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <h1 className={styles.title}>
                    Maintained by{" "}
                    <a href="https://github.com/Ahmedsaed">Ahmed Saed</a>
                </h1>
            </footer>
        </div>
    );
}
