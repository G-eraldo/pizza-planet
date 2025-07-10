"use client";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

export default function UserDashboard() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return <div>Vous devez être connecté pour accéder à cette page</div>;
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <Card className="max-w-2xl mx-auto p-4 md:p-6 mt-32">
      <CardTitle className="text-xl md:text-2xl font-bold mb-4">
        Mon compte
      </CardTitle>
      <CardDescription className="mb-4 md:mb-6 ">
        Bienvenue, {session.user.name}!
      </CardDescription>
      <CardDescription>Mes commandes :</CardDescription>

      <div className="grid grid-row-1 md:grid-row-2 gap-4">
        <div className="grid w-full items-center gap-2">
          <Card>
            <CardDescription className="ml-4 md:ml-6">
              16/05/2025
            </CardDescription>
            <CardContent>Pizza Pepperoni</CardContent>
          </Card>
          <Card>
            <CardDescription className="ml-4 md:ml-6">
              16/06/2025
            </CardDescription>
            <CardContent>Pizza 4 fromages</CardContent>
          </Card>
          <Card>
            <CardDescription className="ml-4 md:ml-6">
              16/02/2025
            </CardDescription>
            <CardContent>Pizza Reine</CardContent>
          </Card>
        </div>
      </div>

      <CardFooter className="flex justify-center">
        <Button onClick={handleSignOut} variant="outline">
          Se déconnecter
        </Button>
      </CardFooter>
    </Card>
  );
}
