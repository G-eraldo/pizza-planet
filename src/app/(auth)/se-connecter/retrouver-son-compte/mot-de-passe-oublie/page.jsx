"use client";

import { forgetPassword } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function page() {
  const params = useSearchParams();
  const emailFromQuery = params.get("email") || "";
  const [email, setEmail] = useState(emailFromQuery);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await forgetPassword({
      email,
      redirectTo: `${window.location.origin}/se-connecter/retrouver-son-compte/mot-de-passe-oublie/reinitialiser-son-mot-de-passe`,
    });
    if (error) {
      toast.error("Une erreur est survenue, veuillez réessayer.");
    } else {
      toast.success(
        "Un email de réinitialisation a été envoyé à votre adresse email."
      );
    }
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto space-y-4 container"
    >
      <h1 className="text-xl font-semibold">Retrouver votre mot de passe</h1>
      <Input
        type="email"
        placeholder="Entrez votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <div className="flex flex-col gap-2">
        <Button type="submit">
          Envoyer le lien de réinitialisation du mot de passe
        </Button>
        <Button asChild variant="outline">
          <Link href="/se-connecter">Se connecter</Link>
        </Button>
      </div>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </form>
  );
}
