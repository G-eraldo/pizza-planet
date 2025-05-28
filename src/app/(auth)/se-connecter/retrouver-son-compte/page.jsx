"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchAccount } from "@/lib/auth/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  async function handleSearch(e) {
    e.preventDefault();
    const found = await searchAccount(email);
    if (found) {
      router.push(
        `/se-connecter/retrouver-son-compte/mot-de-passe-oublie?email=${encodeURIComponent(
          email
        )}`
      );
    } else {
      router.push("/creer-son-compte");
    }
  }
  return (
    <form
      onSubmit={handleSearch}
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
      <Button type="submit">Envoyer</Button>
    </form>
  );
}
