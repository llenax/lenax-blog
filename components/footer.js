import Link from "next/Link";
import styles from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.nav_links}>
        <li className={styles.nav_link}>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className={styles.nav_link}>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
