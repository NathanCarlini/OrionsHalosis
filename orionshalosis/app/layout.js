import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header vis="1" className="sticky top-0" />
        <main className="relative h-full w-full grow">{children}</main>
      </body>
    </html>
  );
}
