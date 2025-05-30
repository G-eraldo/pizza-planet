import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      <div>
        <Button variant="outline" className="ml-4 mt-10">
          <Link href="/">Retour</Link>
        </Button>
        {children}
      </div>
    </>
  );
}
