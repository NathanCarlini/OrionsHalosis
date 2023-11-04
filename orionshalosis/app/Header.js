import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Header({ vis }) {
  return (
    <>
      <header className="flex z-[2] w-full flex-row items-center justify-between bg-marine-blue px-1 md:px-2 lg:px-4 py-[0.5rem] text-sm md:text-lg lg:text-xl font-bold">
        <Link className="flex text-center items-center" href="/">
          <Image
            src="/orionsLogo.png"
            alt="Logo de Orions Halosis"
            height={55}
            width={55}
            className="p-0 md:w-14 lg:w-15"
          />
          Orion's Halosis
        </Link>
        <div className="flex flex-row gap-2 md:gap-10 lg:gap-16">
          <Link className="flex items-center hover:underline" href="/wiki">
            Wiki
          </Link>
          <Link className="flex items-center hover:underline" href="/forum">
            Forum
          </Link>
          <Link className="flex items-center hover:underline" href="/game/overview">
            The Game
          </Link>
        </div>
        {vis == 1 ? (
          <div className="flex flex-row gap-3">
            <Link href="/api/auth/signup">
              <div className=" rounded-full bg-black px-2 py-1 md:px-8 md:py-2 text-white duration-500 hover:bg-slate-500">
                Sign up
              </div>
            </Link>
            <Link href="/api/auth/login">
              <div className=" rounded-full bg-white px-2 py-1 md:px-8 md:py-2 text-black duration-500 hover:text-white hover:bg-slate-500">
                Log In
              </div>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </header>
    </>
  );
}
