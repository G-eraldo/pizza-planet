import "./globals.css";
import { Toaster } from "sonner";
export const metadata = {
  title: "Pizza Planet",
  description: "Une application de commande de pizzas délicieuses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex flex-col h-full">
        <main className="grow">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
