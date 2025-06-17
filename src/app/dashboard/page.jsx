"use client";

import UserDashboard from "@/components/dashboard/UserDashboard";
import NavbarUser from "@/components/navbar/NavbarUser";
import { useSession } from "@/lib/auth/auth-client";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

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
      {session.user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </>
  );
}
