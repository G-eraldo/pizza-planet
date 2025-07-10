"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../connectToDB";
import { Panier } from "../models/panier";
import { Pizza } from "../models/pizza";

export async function addPizzaBAsket(formData) {
  try {
    await connectToDB();

    const name = formData.get("name");
    const taille = formData.get("taille");
    const pate = formData.get("pate");
    const numbers = formData.get("numbers");
    const pizza = await Pizza.findOne({ name });
    if (!pizza) throw new Error("Pizza introuvable");
    let img = pizza.image;
    let price = pizza.price;
    if (taille === "L") price += 2;
    else if (taille === "XL") price += 5;

    // Calcul du prix selon la pâte
    if (pate === "Pan") price += 2;
    else if (pate === "Chessy") price += 3;

    // Prix final pour le nombre de pizzas
    const finalPrice = price * numbers;

    const newBasket = new Panier({
      name,
      taille,
      pate,
      numbers,
      finalPrice,
      img,
    });

    const saveBasket = await newBasket.save();
    const plainBasket = {
      ...newBasket.toObject(),
      _id: newBasket._id.toString(),
    };
    return {
      success: true,
      panier: plainBasket,
      message: "commande créée avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    return {
      success: false,
      message: "Erreur lors de la création de la commande : " + error.message,
    };
  }
}
export async function Basket() {
  try {
    await connectToDB();
    const basket = await Panier.find({}).lean();
    // On convertit explicitement _id en string pour chaque pizza
    return basket.map((basket) => ({
      ...basket,
      _id: basket._id.toString(),
    }));
  } catch (err) {
    console.error("Erreur lors de la récupération de la commande :", err);
    return [];
  }
}

export async function deleteBasket(id) {
  try {
    await connectToDB();
    const deleted = await Panier.findByIdAndDelete(id);

    if (!deleted) {
      return { success: false, message: "Pizza non trouvé" };
    }
    revalidatePath("/panier");
    return { success: true, message: "Pizza supprimé !" };
  } catch (error) {
    return { success: false, message: "Erreur lors de la suppression" };
  }
}
