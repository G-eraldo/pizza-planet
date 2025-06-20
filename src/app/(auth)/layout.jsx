import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function layout({ children }) {
  return (
    <>
      <div>
        <Button variant="outline" className="ml-4 mt-10">
          <Link href="/">Retour</Link>
        </Button>
        {children}
      </div>
    </>
  );
}
