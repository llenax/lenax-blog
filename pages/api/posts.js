import jwt from "jsonwebtoken";
import dbConnect from "../../utils/mongodb";
// import User from "../../models/User";
import Post from "../../models/Post";

dbConnect();

const KEY = process.env.JWT_KEY;

export default async (req, res) => {
  const { token } = req.body || req.cookies;
  jwt.verify(token, KEY, async function (err, decodedToken) {
    if (err) {
      return res.status(400).json(err);
    }
    if (decodedToken) {
      const posts = await Post.find({});

      res.status(200).json({ success: true, posts: posts });
    } else {
      res.status(400).end();
    }
  });
};
