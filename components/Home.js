import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import gdscWhiteLogo from "../public/gdsc-white.png";

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Image
                    src={gdscWhiteLogo}
                    width={510}
                    height={81}
                    className={styles.logo}
                    priority={true}
                    alt="logo"
                />{" "}
                <p className={styles.description}>Certificates 🎉</p>
                <div className={styles.grid}>
                    <Link
                        className={styles.card}
                        href="/create"
                        prefetch={false}
                    >
                        <h2>Create Certificates &rarr;</h2>
                        <p>
                            Create a new certificate <br />
                            (Leads Only)
                        </p>
                    </Link>
                    <Link
                        className={styles.card}
                        href="/preview"
                        prefetch={false}
                    >
                        <h2>Preview Certificates &rarr;</h2>
                        <p>Browse the certificates you created before</p>
                    </Link>
                    <Link
                        className={styles.card}
                        href="/validate"
                        prefetch={false}
                    >
                        <h2>Validate Certificate &rarr;</h2>
                        <p>
                            Verify the authenticity of a certificate by
                            it&apos;s code{" "}
                        </p>
                    </Link>
                    <Link
                        className={styles.card}
                        href="https://github.com/Ahmedsaed/"
                        prefetch={false}
                    >
                        <h2>More About &rarr;</h2>
                        <p>Contact the maintainer and check more projects</p>
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
                <h1 className={styles.title}>
                    Maintained by{" "}
                    <a href="https://www.linkedin.com/in/ahmedsaed26/">
                        Ahmed Saed
                    </a>
                </h1>
            </footer>
        </div>
    );
}
