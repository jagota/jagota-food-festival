import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventProvider } from "@/context/EventContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jagota Food",
  description: "Jagota Food festival",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <EventProvider>
          <Header />
          {children}
          <Footer />
          </EventProvider>
        
        </AuthProvider>
        </body>
    </html>
  );
}
