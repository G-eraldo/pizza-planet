"use server";

import { v2 as cloudinary } from "cloudinary";
import { connectToDB } from "../connectToDB";
import { Pizza } from "../models/pizza";

cloudinary.config({
  cloud_url: process.env.CLOUDINARY_URL,
});

export async function postPizza(formData) {
  const image = formData.get("photo");
  const name = formData.get("name");
  const price = formData.get("price");
  const description = formData.get("description");

  try {
    await connectToDB();
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "client-photos",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const newPizza = new Pizza({
      name,
      description,
      price: parseFloat(price),
      image: uploadResult.secure_url,
    });
    const savedPizza = await newPizza.save();
    const plainPizza = JSON.parse(JSON.stringify(savedPizza));
    return {
      success: true,
      pizza: plainPizza,
      message: "Pizza créée avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la création de la pizza :", error);
    return {
      success: false,
      message: "Erreur lors de la création de la pizza : " + error.message,
    };
  }
}

export async function getPizza() {
  try {
    await connectToDB();
    const pizza = await Pizza.find({});
    return pizza;
  } catch (err) {}
}
