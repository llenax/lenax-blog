import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export const logout = ({ action = "/logout", token, KEY, URL }) => {
  const router = useRouter();

  let user = undefined;
  if (token) {
    try {
      user = jwt.verify(token, KEY);
    } catch (e) {
      user = undefined;
    }
  }

  fetch(URL + "/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //   useEffect(() => {
  //     return router.push("/");
  //   });

  useEffect(() => {
    if (user !== undefined || user !== null) {
      return router.push("/login");
    }
  });
  return <></>;
};

export function getServerSideProps({ req, res }) {
  const JWT_KEY = process.env.JWT_KEY;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  return {
    props: { token: req.cookies.token || "", KEY: JWT_KEY, URL: baseUrl },
  };
}

export default logout;
