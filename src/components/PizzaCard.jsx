import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import pizzas from "@/utils/data";

export default function PizzaCard() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">Nos Pizzas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {pizzas.map((pizza) => (
          <Card key={pizza.id}>
            <CardHeader>
              <CardTitle>{pizza.name}</CardTitle>
              <CardDescription>{pizza.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={pizza.photo}
                alt={pizza.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardContent>
            <CardFooter>
              <p>{pizza.price} euros</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
