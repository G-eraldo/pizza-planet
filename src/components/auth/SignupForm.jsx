"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { LogoIcon } from "../Logo";

export default function SignupForm() {
  const router = useRouter();
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signUp, initialState);

  useEffect(() => {
    if (state.errorMessage?.length) {
      toast.error(state.errorMessage);
    } else if (state.success) {
      toast.success(state.message);
      router.push("/se-connecter");
    }
  }, [state.errorMessage, router]);
  return (
    <div>
      <section className="flex min-h-screen  px-4 py-16 md:py-20">
        <form
          action={formAction}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="p-8 pb-6">
            <div>
              <Link href="/" aria-label="go home">
                <LogoIcon />
              </Link>
              <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
                Créer votre compte Pizza planet
              </h1>
              <p className="text-sm">
                Bienvenue ! Créez un compte pour commencer
              </p>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    Prénom
                  </Label>
                  <Input type="text" required name="firstname" id="firstname" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Nom
                  </Label>
                  <Input type="text" required name="lastname" id="lastname" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input type="email" required name="email" id="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pwd" className="text-title text-sm">
                  Mot de passe
                </Label>
                <Input
                  type="password"
                  required
                  name="pwd"
                  id="pwd"
                  className="input sz-md variant-mixed"
                />
              </div>

              <Button disabled={pending} className="w-full">
                Continue
              </Button>
            </div>
          </div>

          <div className="bg-muted rounded-(--radius) border p-3">
            <p className="text-accent-foreground text-center text-sm">
              Vous avez déjà un compte ?
              <Button asChild variant="link" className="px-2">
                <Link href="/se-connecter">Se connecter</Link>
              </Button>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
