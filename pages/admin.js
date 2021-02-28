import jwt from "jsonwebtoken";
import User from "../models/User";
import UnAuthorized from "../components/unauthorized";

export default function admin({ cookies, users }) {
  const { token } = cookies;
  const decodedToken = jwt.decode(token);

  return <>{decodedToken?.admin ? users : <UnAuthorized />}</>;
}

export async function getServerSideProps({ req, res }) {
  //   const KEY = process.env.JWT_KEY;
  const users = await User.find();
  return {
    props: { cookies: req.cookies, users: JSON.stringify(users) },
  };
}
