import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const reviewsSchema = new mongoose.Schema(
  {
    reviewBy: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
    },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    stock: {
      type: Number,
      requires: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      // lowercase: true,
    },
    code: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    reviews: [reviewsSchema],
    details: [
      {
        name: String,
        value: String,
      },
    ],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
