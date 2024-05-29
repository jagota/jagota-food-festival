import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventProvider } from "@/context/EventContext";
import { CustomerTypeProvider } from "@/context/CustomerTypeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jagota Events",
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
            <CustomerTypeProvider>
              {children}
              <Footer />
            </CustomerTypeProvider>
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
