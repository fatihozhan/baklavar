import { Auth } from "@/middlewares/auth";
import Order from "@/models/Order";
import Product from "@/models/Product";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc()
  .use(Auth)
  .post(async (req, res) => {
    await db.connectDb();
    req.body.values.products.map(async (prod) => {
      let product = await Product.findById(prod.product);
      if (product.stock < prod.qty) {
        await db.disconnectDb()
        return res.status(500).json({error : true, message : "Ürün stoğu tükenmiştir... "})
      }
      product.stock = product.stock - prod.qty;
      await product.save();
    });
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
