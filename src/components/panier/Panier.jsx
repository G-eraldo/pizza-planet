"use client";
import { getCart, removeItem, addToCart, decrementItem } from "@/lib/cart";
import { CircleMinus, CirclePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Panier() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Card className="max-w-5xl mx-auto p-4 md:p-6 mt-24">
      <h1>Ma Commande</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cart.map((paniers) => (
          <Card key={paniers.name}>
            <CardHeader className="flex justify-end mr-5">
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => {
                  removeItem(paniers);
                  setCart(getCart());
                }}
              >
                <Trash />
              </Button>
            </CardHeader>
            <CardTitle className="ml-6">{paniers.name}</CardTitle>
            <CardContent>Taille: {paniers.taille}</CardContent>
            <CardContent>Pâte: {paniers.pate}</CardContent>
            <CardContent>
              Quantité:
              <Button
                variant="outline"
                className="mx-2"
                onClick={() => {
                  decrementItem(paniers);
                  setCart(getCart());
                }}
              >
                <CircleMinus className="" />
              </Button>
              {paniers.quantity}
              <Button
                variant="outline"
                className="mx-2"
                onClick={() => {
                  addToCart(paniers);
                  setCart(getCart());
                }}
              >
                <CirclePlus />
              </Button>
            </CardContent>
            <CardContent>
              <img
                src={paniers.image}
                alt="photo de la pizza"
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardContent>
            <CardFooter>
              Prix: {paniers.price * paniers.quantity} euros
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline">
          Payer {cart.length === 0 ? "" : `${total} euros`}
        </Button>
        <Button variant="outline" className="ml-4">
          Annuler
        </Button>
      </div>
    </Card>
  );
}
