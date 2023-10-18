import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Header({ vis }) {
  return (
    <>
      <header className="flex w-full flex-row items-center justify-between bg-marine-blue px-3 py-[0.10rem] text-xl font-bold">
        <Link className="flex items-center" href="/">
          <Image
            src="/orionsLogo.png"
            alt="Logo de Orions Halosis"
            height={75}
            width={75}
            className="mr-2 p-0"
          />
          Orion's Halosis
        </Link>
        <div className="flex flex-row gap-16">
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
            <Link href="/signup">
              <div className=" rounded-full bg-black px-8 py-2 text-white duration-500 hover:bg-slate-500">
                Sign up
              </div>
            </Link>
            <Link href="/login">
              <div className=" rounded-full bg-white px-8 py-2 text-black duration-500 hover:text-white hover:bg-slate-500">
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
