import Link from "next/link";

export default function layout({ children }) {
  return (
    <>
      <div>
        <button className="btn btn-accent ml-4 mt-10">
          <Link href="/">Retour</Link>
        </button>
        {children}
      </div>
    </>
  );
}
