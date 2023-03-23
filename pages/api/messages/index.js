import { Auth } from "@/middlewares/auth";
import Message from "@/models/Message";
import Product from "@/models/Product";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc();

handler.post(async (req, res) => {
  const { email, phone, message, subject, name } = req.body.values;

  await db.connectDb();
  const newMessage = await new Message({
    email,
    phone,
    message,
    subject,
    name,
  });
  await newMessage.save();
  if (newMessage) {
    await db.disconnectDb();
    return res.status(200).json({
      success: true,
      message: "Mesajınız başarılı bir şekilde iletilmiştir.",
    });
  }
  await db.disconnectDb();

  return res.status(200).json({
    error: true,
    message: "Bir şeyler yanlış gitti.",
  });
});
handler.use(Auth).patch(async (req, res) => {
  const { id } = req.body;
  await db.connectDb();
  const prev = await Message.findById(id);
  const test = await Message.findByIdAndUpdate(
    id,
    {
      isReached: prev.isReached ? false : true,
    },
    { new: true }
  );
  if (!test) {
    await db.disconnectDb();
    return res
      .status(500)
      .json({ error: true, message: "Bir hata meydana geldi" });
  }
  await db.disconnectDb();
  return res
    .status(200)
    .json({ success: true, message: "Güncelleme Başarılı" });
});
handler.put(async (req, res) => {
  const { id } = req.body;
  await db.connectDb();
  const product = await Product.findOne({ "reviews._id": id });
  product.reviews.map((review) => {
    if (review._id == id) {
      review.approved = review.approve ? false : true;
    }
  });
  await product.save()
  await db.disconnectDb();
  return res
    .status(200)
    .json({ success: true, message: "Güncelleme Başarılı" });
});

export default handler;
