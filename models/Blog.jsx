import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: "Lütfen Adınızı Giriniz.",
    },
    category: {
      type: String,
      required: "Lütfen Bir Kategori Giriniz.",
    },
    date: {
      type: Date,
      default: new Date().toISOString(),
    },
    title: {
      type: String,
      required: "Lütfen Bir Başlık Giriniz.",
    },
    content: {
      type: String,
      required: "Yorum Kısmı Boş Bırakılamaz.",
    },
    img: {
      type: String,
      required: "Lütfen Resim Yolunu Giriniz.",
    },
    slug: {
      type: String,
      required: "Slug geçersiz",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
