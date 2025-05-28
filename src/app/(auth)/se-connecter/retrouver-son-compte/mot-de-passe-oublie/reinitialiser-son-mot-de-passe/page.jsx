"use client";

import { resetPassword } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const SearchParams = useSearchParams();
  const token = SearchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setMessage("Token manquant");
    }
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) return;

    const { error } = await resetPassword({
      token,
      newPassword: password,
    });
    if (error) {
      toast.error("Une erreur est survenue, veuillez réessayer.");
    } else {
      toast.success("Mot de passe réinitialisé avec succès.");
      router.push("/se-connecter"), 3000;
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto space-y-4 container"
    >
      <h1 className="text-xl font-semibold">
        Réinitialiser votre mot de passe
      </h1>
      {message && <p>{message}</p>}
      <Input
        type="password"
        placeholder="Entrez votre nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border"
      />
      <Button type="submit">Réinitialiser le mot de passe</Button>
    </form>
  );
}
