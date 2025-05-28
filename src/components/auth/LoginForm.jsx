"use client";

import { signIn } from "@/lib/auth/action";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { LogoIcon } from "../Logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LoginForm() {
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signIn, initialState);

  useEffect(() => {
    if (state.errorMessage?.length) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);
  return (
    <section className="flex min-h-screen  px-4 py-16 md:py-20 ">
      <form
        action={formAction}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <LogoIcon className="h-8 w-8" />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Se connecter à Pizza planet
            </h1>
            <p className="text-sm">
              Bon retour ! Connectez-vous pour continuer
            </p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input type="email" required name="email" id="email" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-title text-sm">
                  Mot de passe
                </Label>
                <Button asChild variant="link" size="sm">
                  <Link
                    href="/se-connecter/retrouver-son-compte"
                    className="link intent-info variant-ghost text-sm"
                  >
                    Mot de passe oublié ?
                  </Link>
                </Button>
              </div>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed"
              />
            </div>

            <Button disabled={pending} className="w-full">
              Se connecter
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Pas encore de compte ?
            <Button asChild variant="link" className="px-2">
              <Link href="/creer-son-compte">Créer un compte</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
