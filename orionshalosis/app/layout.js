import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="flex w-full flex-row items-center justify-between bg-marine-blue px-3 py-2 text-xl font-bold">
          <Link className="flex items-center" href="/">
            <Image
              src="/orionsLogo.png"
              alt="Logo de Orions Halosis"
              height={80}
              width={80}
              className="mr-2 p-0"
            />
            Orion's Halosis
          </Link>
          <div className="flex flex-row gap-16">
            <Link className="flex items-center" href="/wiki">
              Wiki
            </Link>
            <Link className="flex items-center" href="/forum">
              Forum
            </Link>
            <Link className="flex items-center" href="/game/overview">
              The Game
            </Link>
          </div>
          <div className="flex flex-row gap-3">
            <div className=" rounded-full bg-black px-8 py-2 capitalize text-white">
              sign up
            </div>
            <div className=" rounded-full bg-white px-8 py-2 capitalize text-black">
              Log In
            </div>
          </div>
        </header>
        <main className="h-full w-full">{children}</main>
        <footer className="flex w-full flex-row px-4 py-3">
          2023 Orions's Halosis ©
        </footer>
      </body>
    </html>
  );
}
