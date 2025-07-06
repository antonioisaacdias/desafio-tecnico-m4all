import "./globals.css";
import { Inter } from "next/font/google";
import '@/lib/fontawesome';
import Header from "./components/Header";
import { Toaster } from 'react-hot-toast';

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
      <body className={`antialiased bg-background min-h-screen flex flex-col`}>
        <Header />
        <main className="px-12 pt-8 pb-6 flex-1">
          {children}
        </main>
        <footer className="text-center text-gray-500 text-sm p-4 bg-gray-50 border-t border-gray-200 mt-auto">
                © 2025 Media4All. Todos os direitos reservados.
        </footer>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
