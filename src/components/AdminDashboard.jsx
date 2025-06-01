"use client";

import { postPizza } from "@/lib/serverAction/PizzaPost";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function AdminDashboard() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await postPizza(formData);
      if (response.success) {
        toast("Pizza ajoutée avec succès !");
        event.target.reset(); // Réinitialiser le formulaire
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la pizza :", error);
      toast.error("Erreur lors de l'ajout de la pizza : " + error.message);
    }
  }
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-2xl p-8 space-y-6 shadow-lg">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Ajouter une nouvelle pizza
              </h3>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nom de la pizza
                </Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nom de la pizza"
                  className="w-full"
                />
              </div>

              <div className="grid w-full items-center gap-3">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description de la pizza
                </Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Description de la pizza"
                  className="w-full"
                />
              </div>

              <div className="grid w-full items-center gap-3">
                <Label htmlFor="price" className="text-sm font-medium">
                  Prix de la pizza
                </Label>
                <Input
                  type="text"
                  name="price"
                  placeholder="Prix de la pizza"
                  className="w-full"
                />
              </div>

              {/* <div className="grid w-full items-center gap-3">
                <Label htmlFor="photo" className="text-sm font-medium">
                  Photo de la pizza
                </Label>
                <Input name="photo" type="file" className="w-full" />
              </div> */}

              <Button className="w-full mt-4">Ajouter la pizza</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
