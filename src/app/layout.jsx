import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Pizza Planet",
  description: "Une application de commande de pizzas délicieuses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full" data-theme="light">
      <body className="flex flex-col min-h-full">
        <main className="grow">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
