"use client";

import NavbarUser from "@/components/navbar/NavbarUser";
import { useSession } from "@/lib/auth/auth-client";

import AdminDashboard from "@/components/AdminDashboard";
import PizzaCard from "@/components/PizzaCard";

export default function page() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return <div>Vous devez être connecté pour accéder à cette page</div>;
  }

  return (
    <>
      <NavbarUser />
      {session.user.role === "admin" ? <AdminDashboard /> : <PizzaCard />}
    </>
  );
}
