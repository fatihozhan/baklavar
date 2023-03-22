import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please enter your full name.",
    },
    email: {
      type: String,
      required: "Please enter your email adress.",
      trim: true,
    },
    phone: {
      type: Number,
      required: "Please enter your phone number.",
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    isReached: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
