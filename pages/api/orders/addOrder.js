import { Auth } from "@/middlewares/auth";
import Order from "@/models/Order";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc()
  .use(Auth)
  .post(async (req, res) => {
    await db.connectDb();
    const newOrder = await new Order(req.body.values);
    await newOrder.save();
    if (!newOrder) {
      await db.disconnectDb();
      return res.status(500).json({ error: true, message: "Bir hata oluştu." });
    }
    await db.disconnectDb();
    return res.status(200).json({ success : true, message : "Siparişiniz Başarıyla Oluşturuldu." });
  });

export default handler;
