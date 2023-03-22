import db from "@/utils/db";
import User from "@/models/User";
import nc from "next-connect";
import { Auth } from "@/middlewares/auth";

const handler = nc({
/*   onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  }, */
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).use(Auth).post(async (req, res) => {
  const { username } = req.body;
  await db.connectDb();
  const user = await User.findOne({ username });
  delete user.password;
  await db.disconnectDb();
  return res.json({ user });
});

export default handler;
