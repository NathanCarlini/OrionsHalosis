import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <UserProvider>
      <body className="flex min-h-screen flex-col">
        <Header vis="1"/>
        <main className="h-full w-full grow relative">{children}</main>
        <Footer vis="1" />
      </body>
    </UserProvider>
    </html>
  );
}
