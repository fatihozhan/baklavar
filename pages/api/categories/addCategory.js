import nc from "next-connect";
import db from "@/utils/db";
import Category from "@/models/Category";
import { Auth } from "@/middlewares/auth";
import slugify from "slugify";

const handler = nc().use(Auth);

handler.post(async (req, res) => {
  await db.connectDb();
  const categories = await Category.find({
    slug: slugify(req.body.values).toLowerCase(),
  });

  if (categories.length != 0) {
    await db.disconnectDb();
    return res.status(500).json({
      error: true,
      message: "Bu isimle daha önce bir kategori kaydedilmiş.",
    });
  }
  await new Category({
    name: req.body.values,
    slug: slugify(req.body.values).toLowerCase(),
  }).save() ;
  const newCategories = await Category.find({});
  await db.disconnectDb();
  return res.status(200).json({
    success: true,
    message: "Kategori ekleme işlemi başarılı",
      category: newCategories,
  });
});

export default handler;
