import Header from "../components/header";
import Footer from "../components/footer";

import styles from "../styles/Home.module.scss";

import Slider from "../components/slider";

export default function Home({ token }) {
  const isLoggedin = token ? true : false;
  return (
    <>
      <Header login={isLoggedin} />
      <section className={styles.section}>
        <div className={styles.left_sidebar}>
          <div className={styles.intro_slider}>
            <Slider />
          </div>
          <div className={styles.intro}></div>
        </div>
        <div className={styles.right_sidebar}>
          <div className={styles.links}></div>
          <div className={styles.medias}></div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
