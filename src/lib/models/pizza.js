import mongoose from "mongoose";

const postPizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Pizza =
  mongoose.models?.Pizza || mongoose.model("Pizza", postPizzaSchema);
