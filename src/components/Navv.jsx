"use client";
import Signout from "@/components/auth/Signout";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client";
import { UserRoundCog } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navv() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef(null);

  const user = session?.user;

  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Pizza Planet
          </Link>
        </div>
        <div className="flex-none">
          {user ? (
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1 gap-2">
                <li>
                  <Button variant="outline">
                    <Link href="/">Commander</Link>
                  </Button>
                </li>
                <li>
                  <Button onClick={handleMenuClick}>{user.email}</Button>
                  {isOpen && (
                    <ul
                      ref={dropdownRef}
                      className="bg-white absolute right-0 top-10 w-[250px] shadow-lg rounded-md p-2"
                    >
                      <li className="my-2">
                        <Link href="/mon-compte">
                          <UserRoundCog /> Mon compte
                        </Link>
                      </li>
                      <li className="my-2">
                        <Signout />
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
