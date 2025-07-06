import "./globals.css";
import { Inter } from "next/font/google";
import '@/lib/fontawesome';
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR"
      className={inter.variable}>
      <body className={`antialiased bg-background`}>
        <Header />
        <main className="px-12 pt-8 pb-6">
          {children}
        </main>
        <footer className="text-center text-gray-500 text-sm p-4">
                © 2023 Media4All. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
