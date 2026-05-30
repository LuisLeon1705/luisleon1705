import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./Completitude.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis Leon | El Especial del Día",
  description: "Una experiencia culinaria de software y vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="bg-white text-zinc-900 overflow-x-hidden">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
