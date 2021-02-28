import jwt from "jsonwebtoken";
import cookie from "cookie";
import dbConnect from "../../../utils/mongodb";
import User from "../../../models/User";

dbConnect();

const KEY = process.env.JWT_KEY;

export default async (req, res) => {
  if (!req.body) {
    return res.status(404).send("not found.");
  }

  const { username, password } = req.body;

  // let user = await User.find({ name: username, password: password }).then(
  //   (t) => t[0]
  // );
  const user = await User.findByCredentials(username, password);
  if (user && user.code !== "invalid") {
    // user = user[0];
    jwt.verify(user.token, KEY, function (err, decodedToken) {
      if (err) {
        res.statusCode = 400;
        return res.json({ success: false, message: err });
      }
      const { name, admin } = decodedToken;
      if (name !== username) {
        res.statusCode = 400;
        return res.json({
          sucess: false,
          message: "username or password wrong.",
        });
      }
      if (user.admin !== admin) {
        res.statusCode = 400;
        return res.json({
          sucess: false,
          message: "an error occurred contact with support.",
        });
      }
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", user.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      res.json({ success: true, token: user.token });
    });
  } else {
    res.statusCode = 400;
    res.json({
      success: false,
      message: "there is no user with this credentials",
    });
  }
};
