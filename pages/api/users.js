import dbConnect from "../../utils/mongodb";
import User from "../../models/User";
import jwt from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { token } = req.cookies;

  const decodedToken = jwt.decode(token);
  if (decodedToken?.admin) {
    switch (method) {
      case "GET":
        try {
          const users = await User.find();

          res.status(200).json({ success: true, data: users });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
    }
  } else {
    res.status(400).json({ success: false, message: "access denied" });
  }
};
