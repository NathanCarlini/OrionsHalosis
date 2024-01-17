"use client";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import React from "react";
export default function Header() {
  return (
    <>
      <header className="z-[2] flex w-full flex-row items-center justify-between bg-marine-blue px-1 py-[0.5rem] text-sm font-bold md:px-2 md:text-lg lg:px-4 lg:text-xl">
        <Link className="flex items-center text-center gap-3" href="/">
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
        <div className="flex flx-row">
          {/* {avatar == '' ? ( */}
          <div className="flex flex-row gap-3">
            <Link href="/signup">
              <div className=" rounded-full bg-black px-2 py-1 text-white duration-500 hover:bg-slate-500 md:px-8 md:py-2">
                Sign up
              </div>
            </Link>
            <Link href="/login">
              <div className=" rounded-full bg-white px-2 py-1 text-black duration-500 hover:bg-slate-500 hover:text-white md:px-8 md:py-2">
                Log In
              </div>
            </Link>
          </div>
          {/* ) : ( */}
          <Link href="/account">
            <Image src="/defaultuser1.png" alt="test" width={40} height={40} />
          </Link>
          {/* )} */}
        </div>
      </header>
    </>
  );
}
