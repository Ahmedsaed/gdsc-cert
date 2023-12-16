import GDSC from "../components/GDSC";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <GDSC />
        <p className={styles.description}>Certificates🎉</p>

        <div className={styles.grid}>
          <Link href="/validate">
            <a className={styles.card}>
              <h2>Validate Certificate &rarr;</h2>
              <p>Verify the authenticity of certificate by it&apos;s code </p>
            </a>
          </Link>
          <Link passHref href="/preview">
            <a className={styles.card}>
              <h2>Preview Certificate &rarr;</h2>
              <p>Add names on certificates and see how it looks</p>
            </a>
          </Link>
          <Link passHref href="/admin">
            <a className={styles.card}>
              <h2>Create Certificates &rarr;</h2>
              <p>For Google Develeloper Student Clubs Leads Only</p>
            </a>
          </Link>
          <a
            href="https://www.linkedin.com/in/ahmedsaed26/"
            className={styles.card}
          >
            <h2>More About &rarr;</h2>
            <p>Contact The Maintainer and Check more Projects</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <div>
          <h1 className={styles.title}>
            Maintained by{" "}
            <a href="https://github.com/Ahmedsaed">Ahmed Saed</a>
          </h1>
          <br/>
          <h2 className={styles.title}>
            Made with 💖 by{" "}
            <a href="https://github.com/dev-ahmedhany">Ahmed Hany</a>
          </h2>
        </div>
      </footer>
    </div>
  );
}
