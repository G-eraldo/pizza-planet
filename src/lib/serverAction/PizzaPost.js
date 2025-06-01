"use server";

import { connectToDB } from "../connectToDB";
import { Pizza } from "../models/pizza";

export async function postPizza(formData) {
  const { name, description, price } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const newPizza = new Pizza({
      name,
      description,
      price: parseFloat(price),
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
