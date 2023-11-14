"use client";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import Buttons from "./Buttons"
let vis = 1;

export default function Header({ avatar }) {
  console.log(vis);
  return (
    <>
      <header className="z-[2] flex w-full flex-row items-center justify-between bg-marine-blue px-1 py-[0.5rem] text-sm font-bold md:px-2 md:text-lg lg:px-4 lg:text-xl">
        <Link className="flex items-center text-center" href="/">
          <Image
            src="/orionsLogo.png"
            alt="Logo de Orions Halosis"
            height={55}
            width={55}
            className="lg:w-15 p-0 md:w-14"
          />
          Orions Halosis
        </Link>
        <div className="flex flex-row gap-2 md:gap-10 lg:gap-16">
          <Link className="flex items-center hover:underline" href="/wiki">
            Wiki
          </Link>
          <Link className="flex items-center hover:underline" href="/forum">
            Forum
          </Link>
          <Link
            className="flex items-center hover:underline"
            href="/game/overview"
          >
            The Game
          </Link>
        </div>
        <Buttons />
      </header>
    </>
  );
}
