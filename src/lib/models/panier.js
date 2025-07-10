import mongoose from "mongoose";

const postPanierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  taille: {
    type: String,
    required: true,
  },
  pate: {
    type: String,
    required: true,
  },
  numbers: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export const Panier =
  mongoose.models?.Panier || mongoose.model("Panier", postPanierSchema);
