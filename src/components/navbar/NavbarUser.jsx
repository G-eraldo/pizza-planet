import React from "react";
import { useSession } from "@/lib/auth/auth-client";
import Link from "next/link";
import Signout from "@/components/auth/Signout";

export default function NavbarUser() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Pizza Planet
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Commander</Link>
            </li>
            <li>
              <details>
                <summary>{user.email}</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link href="/mon-compte">Mon compte</Link>
                  </li>
                  <li>
                    <Signout />
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
