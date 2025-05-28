import React from "react";
import { LogOutIcon } from "../Logo";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function Signout() {
  const router = useRouter();
  async function handleClick() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }
  return (
    <div className="flex items-center flex-row gap-2" onClick={handleClick}>
      <LogOutIcon />
      Se deconnecter
    </div>
  );
}
