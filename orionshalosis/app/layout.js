import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header vis="1" />
        <main className="h-full w-full grow">{children}</main>
        <Footer vis="1" />
      </body>
    </html>
  );
}
