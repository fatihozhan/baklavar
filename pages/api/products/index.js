import nc from "next-connect";
import fs from "fs";
import { Auth } from "@/middlewares/auth";
import Product from "@/models/Product";
import slugify from "slugify";
import db from "@/utils/db";

const handler = nc().use(Auth);

handler.post(async (req, res) => {
  await db.connectDb();
  if (req.body.values.id) {
    req.body.values.images = [];
    req.body.values.pictures.map((picture) => {
      if (typeof picture == "string") {
        req.body.values.images.push(
          getImage(
            picture,
            slugify(req.body.values.name).toLowerCase()
          ).toString()
        );
      } else {
        req.body.values.images.push(picture.url);
      }
    });
    delete req.body.values.pictures;
    const product = await Product.findByIdAndUpdate(req.body.values.id, {
      ...req.body.values,
    });
    if (product) {
      return res.status(200).json({
        success: true,
        message: "Ürün başarılı bir şekilde güncellendi.",
      });
    }
    return res.status(500).json({ error: true, message: "Bir hata oluştu." });
  }
  const test = await Product.find({
    slug: slugify(req.body.values.name).toLowerCase(),
  });
  if (test.length != 0) {
    await db.disconnectDb();
    return res
      .status(500)
      .json({ error: true, message: "Bu isimle bir ürün bulunmaktadır." });
  }
  req.body.values.slug = slugify(req.body.values.name).toLowerCase();
  req.body.values.details = [];
  req.body.values.tags?.map((tag) =>
    req.body.values.details.push({
      name: "tags",
      value: tag,
    })
  );
  req.body.values.benefits?.map((benefit) =>
    req.body.values.details.push({
      name: "benefits",
      value: benefit,
    })
  );
  delete req.body.values.tags;
  delete req.body.values.benefits;
  req.body.values.images = [];
  req.body.values.pictures.map((picture) =>
    req.body.values.images.push(
      getImage(picture, slugify(req.body.values.name).toLowerCase()).toString()
    )
  );
  delete req.body.values.pictures;
  const newProduct = await new Product(req.body.values).save();
  if (newProduct) {
    await db.disconnectDb();
    return res
      .status(200)
      .json({ success: true, message: "Ürün başarıyla eklendi." });
  }
  await db.disconnectDb();
  return res.status(500).json({ error: true, message: "Bir Sorun Oluştu." });
});

handler.delete(async (req, res) => {
  await db.connectDb();
  const product = await Product.findByIdAndDelete(req.body.key);
  if (!product) {
    await db.disconnectDb();
    return res.status(404).json({ error: true, message: "Ürün bulunamadı." });
  }
  if (product.images.length > 0) {
    product.images.map((img) => {
      fs.unlink(`${process.cwd()}/public${img}`, (err) => {
        err ? console.log(err) : "";
      });
    });
  }
  await db.disconnectDb();
  return res.status(200).json({ success: true, message: "Ürün silindi. " });
});

handler.patch(async (req, res) => {
  const { values } = req.body;
  const { id } = values;
  delete values.id;
  await db.connectDb();
  const product = await Product.findById(id);
  const numReviews = product.numReviews;
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $push: {
        reviews: values,
      },
      numReviews: numReviews + 1,
    },
    { new: true }
  );

  if (!updatedProduct) {
    await db.disconnectDb();
    return res.status(500).json({ error: true, message: "Bir hata oluştu." });
  }
  await db.disconnectDb();
  return res
    .status(200)
    .json({ success: true, message: "Yorumunuz kaydedildi. Onay bekliyor." });
});
handler.put(async (req, res) => {
  const { id } = req.body;
  await db.connectDb();
  const product = await Product.findOne({ "reviews._id": id });
  if (!product) {
    await db.disconnectDb();
    return res
      .status(404)
      .json({ error: true, message: "Ürün bulunamamaktadır." });
  }
  product.numReviews = product.numReviews - 1;
  product.reviews = product.reviews.filter((rev) => rev._id != id);
  await product.save();
  await db.disconnectDb();
  return res
    .status(200)
    .json({ success: true, message: "Yorum başarıyla silindi" });
});

function getImage(picture, name) {
  let uzanti;
  if (picture) {
    uzanti = picture.slice(0, 25).includes("data:image/jpeg;base64,/")
      ? picture.substring(0, 23)
      : picture.substring(0, 22);
    uzanti = uzanti.slice(11).split(";")[0];

    const base64Data = picture.slice(0, 25).includes("data:image/png;base64,/")
      ? picture.replace(/^data:image\/png;base64,/, "")
      : picture.slice(0, 25).includes("data:image/jpg;base64,/")
      ? picture.replace(/^data:image\/jpg;base64,/, "")
      : picture.slice(0, 25).includes("data:image/jpeg;base64,/")
      ? picture.replace(/^data:image\/jpeg;base64,/, "")
      : picture.replace(/^data:image\/gif;base64,/, "");

    let fullImageName = `/images/products/${
      name + Math.floor(Math.random() * 100) + 1
    }.${uzanti}`;
    fs.writeFileSync(
      `${process.cwd()}/public${fullImageName}`,
      base64Data,
      "base64",
      (err) => console.log(err)
    );
    return fullImageName;
  }
}

export default handler;
