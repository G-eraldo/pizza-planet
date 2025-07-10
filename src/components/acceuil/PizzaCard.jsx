import { connectToDB } from "@/lib/connectToDB";
import { getPizza } from "@/lib/serverAction/uploadImage";
import PizzaCardClient from "./PizzaCardClient";

export default async function PizzaCard() {
  await connectToDB();
  const pizzas = await getPizza();

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Nos Pizzas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {pizzas.map((pizza) => (
          <PizzaCardClient key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </>
  );
}
