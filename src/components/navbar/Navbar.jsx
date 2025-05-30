"use client";

import { useSession, signOut } from "@/lib/auth/auth-client";
import Link from "next/link";

import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Pizza Planet
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Button variant="outline">
                <Link href="/">Commander</Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link href="/se-connecter">Se connecter</Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
