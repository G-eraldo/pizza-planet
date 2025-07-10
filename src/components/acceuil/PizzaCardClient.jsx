"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addToCart } from "@/lib/cart";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function ({ pizza }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const item = {
      name: formData.get("name"),
      taille: formData.get("taille"),
      pate: formData.get("pate"),
      quantity: formData.get("numbers"),
      price: finalPrice,
      image: pizza.image,
    };
    addToCart(item);

    window.dispatchEvent(new Event("cartUpdated"));
    toast("Pizza ajoutée avec succès dans le panier!");
    event.target.reset(); // Réinitialiser le formulaire
  }
  const nb = [
    { id: 1, ch: 1 },
    { id: 2, ch: 2 },
    { id: 3, ch: 3 },
    { id: 4, ch: 4 },
    { id: 5, ch: 5 },
    { id: 6, ch: 6 },
    { id: 7, ch: 7 },
    { id: 8, ch: 8 },
    { id: 9, ch: 9 },
    { id: 10, ch: 10 },
  ];
  const [taille, setTaille] = useState("");
  const [pate, setPate] = useState("");
  const price = pizza.price;
  const TaillePrice =
    taille === "L" ? price + 2 : taille === "XL" ? price + 5 : price;
  const finalPrice =
    pate === "Pan"
      ? TaillePrice + 2
      : pate === "Chessy"
        ? TaillePrice + 3
        : TaillePrice;

  return (
    <>
      <Card className="max-w-5xl mx-10 p-4 md:p-6 mt-24">
        <CardHeader>
          <CardTitle>{pizza.name}</CardTitle>
          <CardDescription>{pizza.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-y-3">
          <div>
            <p>{finalPrice} euros</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="name" value={pizza.name} />
            <div className="flex flex-col">
              <div className="mb-3">
                <Select name="taille" onValueChange={setTaille}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tailles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medium">Medium: 28 cm</SelectItem>
                    <SelectItem value="L">L: 33cm</SelectItem>
                    <SelectItem value="XL">XL: 40cm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-3">
                <Select name="pate" onValueChange={setPate}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pâtes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fine">Pâte fine</SelectItem>
                    <SelectItem value="Pan">Pan</SelectItem>
                    <SelectItem value="Chessy">Chessy</SelectItem>
                    <SelectItem value="Classique">Classique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Select name="numbers">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="nombres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-5 ml-24">
              <Button variant="outline" className="cursor-pointer">
                Ajouter au panier
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
