"use client";
import Signout from "@/components/auth/Signout";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client";
import { ShoppingCart, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCart } from "@/lib/cart";

export default function Navv() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { data: session } = useSession();
  const dropdownRef = useRef(null);
  const user = session?.user;

  function updateCartCount() {
    const cart = getCart();
    const totalItem = cart.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    setCartCount(totalItem);
  }

  useEffect(() => {
    updateCartCount();
  }, []);

  useEffect(() => {
    function handleStorageChange() {
      updateCartCount();
    }
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

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
                  <Button asChild>
                    <Link href="/panier">
                      <span className="absolute right-0 top-0 mr-1 text-xs">
                        {cartCount}
                      </span>
                      <ShoppingCart />
                    </Link>
                  </Button>
                </li>
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
                        {user.role === "admin" ? (
                          <Link href="/dashboard">
                            <UserRoundCog /> Dashboard
                          </Link>
                        ) : (
                          <Link href="/mon-compte">
                            <UserRoundCog /> Mon compte
                          </Link>
                        )}
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
                  <Button asChild>
                    <Link href="/panier">
                      <span className="absolute right-0 top-0 mr-1 text-xs">
                        {cartCount}
                      </span>
                      <ShoppingCart />
                    </Link>
                  </Button>
                </li>
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
