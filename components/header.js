import Link from "next/link";
import styles from "../styles/Header.module.scss";

export default function Header({ login = false }) {
  return (
    <nav className={styles.nav}>
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

      <ul className={styles.login}>
        {!login ? (
          <>
            <li className={styles.nav_link}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li className={styles.nav_link}>
              <Link href="/signin">
                <a>Register</a>
              </Link>
            </li>{" "}
          </>
        ) : (
          <>
            <li className={styles.nav_link}>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
