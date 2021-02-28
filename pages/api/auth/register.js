import jwt from "jsonwebtoken";
import dbConnect from "../../../utils/mongodb";
import User from "../../../models/User";
const bcrypt = require("bcryptjs");

dbConnect();

const KEY = process.env.JWT_KEY;

export default async (req, res) => {
  const { username, password } = req.body;

  const token = jwt.sign(
    {
      name: username,
      admin: false,
    },
    KEY
  );

  let user = await User.find({ name: username, password: password }).then(
    (t) => t[0]
  );
  if (user === undefined) {
    const data = {
      name: username,
      password: await bcrypt.hash(password, 8),
      admin: false,
      token: token,
    };
    try {
      const newUser = await User.create(data);
      if (newUser) {
        res.status(200).json({ success: true, token: token });
      }
    } catch (e) {}
  } else {
    res
      .status(400)
      .json({ success: false, message: "you are already signed in" });
  }
};
