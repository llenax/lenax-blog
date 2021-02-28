import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

import styles from "../styles/Sign.module.scss";

export default function login({ action = "/login", token, KEY }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Login");

  let user = undefined;
  if (token) {
    try {
      user = jwt.verify(token, KEY);
    } catch (e) {
      user = undefined;
    }
  }

  useEffect(() => {
    if (user) {
      return router.push("/");
    }
  });

  const submitForm = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());
    const token = res.token;
    if (token) {
      router.push("/");
    } else {
      setMessage("Something went wrong!");
    }
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: action,
    });
  };

  return (
    <>
      {!user && (
        <div className={styles.section}>
          <h1>{message}</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              className={styles.inputUsername}
            ></input>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className={styles.inputPassword}
            ></input>
            <input
              type="submit"
              onClick={submitForm}
              className={styles.submit}
            ></input>
          </form>
        </div>
      )}
    </>
  );
}

export function getServerSideProps({ req, res }) {
  const KEY = process.env.JWT_KEY;

  return { props: { token: req.cookies.token || "", KEY: KEY } };
}
