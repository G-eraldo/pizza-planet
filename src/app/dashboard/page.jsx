"use client";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { Toaster } from "sonner";
import { useSession } from "@/lib/auth/auth-client";
import { useEffect } from "react";

export default function page() {
  const { data: session, isPending, refetch } = useSession();

  useEffect(() => {
    if (!session) {
      refetch();
    }
  }, [session, refetch]);

  if (isPending) {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return (
      <Toaster>Vous devez être connecté pour accéder à cette page</Toaster>
    );
  }

  return (
    <>
      {session.user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </>
  );
}
