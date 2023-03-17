import db from "@/utils/db";
import bcrypt from "bcrypt";
import User from "@/models/User";
import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  const { username, password, email, name } = req.body.values;
  await db.connectDb();
  const user = await User.findOne({ email });
  if (user) {
    await db.disconnectDb();
    return res.json({
      message:
        "Bu e posta adresiyle daha önceden kayıt yapılmış. Lütfen giriş yapınız.",
    });
  }
  const newPassword = await bcrypt.hash(password, 8);
  const newUser = await new User({
    name,
    email,
    username,
    password: newPassword,
  }).save();
  await db.disconnectDb();
  return res.json({
    user: newUser,
    message: "Kayıt başarılı bir şekilde oluşturuldu lütfen giriş yapınız.",
  });
});

export default handler;
