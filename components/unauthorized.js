import Link from "next/link";

import styles from "../styles/UnAuthorized.module.scss";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UnAuthorized() {
  return (
    <>
      <div className={styles.denied}>
        <h1>You don't have permission to view this page.</h1>
        <Link href="/">
          <button>
            Return
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={styles.notfound_icon}
            />
          </button>
        </Link>
      </div>
    </>
  );
}
