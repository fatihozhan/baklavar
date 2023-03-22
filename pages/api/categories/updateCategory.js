import nc from "next-connect";
import { Auth } from "@/middlewares/auth";
import Category from "@/models/Category";
import db from "@/utils/db";
import slugify from "slugify";

const handler = nc().use(Auth);

handler.delete(async (req, res) => {
  await db.connectDb();
  const categories = await Category.findByIdAndDelete(req.body.key);
  if (!categories) {
    await db.disconnectDb();
    return res
      .status(404)
      .json({ error: true, message: "Kategori Bulunumadı." });
  }
  const newCategories = await Category.find({});
  await db.disconnectDb();
  return res.status(200).json({
    success: true,
    message: "Kategori Silindi",
    category: newCategories,
  });
});
handler.post(async (req, res) => {
  await db.connectDb();
  const { key, name } = req.body;
  const test = await Category.find({ slug: slugify(name).toLowerCase() });
  if (test) {
    await db.disconnectDb();
    return res
      .status(500)
      .json({ error: true, message: "Bu isimde bir kategori mevcut" });
  }
  const category = await Category.findByIdAndUpdate(key, {
    name,
    slug: slugify(name).toLowerCase(),
  });
  if (!category) {
    await db.disconnectDb();
    return res
      .status(500)
      .json({ error: true, message: "Kategori Bulunamadı" });
  }
  const categories = await Category.find({});
  await db.disconnectDb()
  return res.status(200).json({
    success: true,
    message: "Kategori güncelleme başarılı",
    categories,
  });
});

export default handler;
