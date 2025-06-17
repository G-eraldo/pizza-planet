"use client";
import { useSession, signOut } from "@/lib/auth/auth-client";

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
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Bienvenue, {session.user.name}!</p>
        <p>Email: {session.user.email}</p>

        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>
    </>
  );
}
