"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import "../globals.css";
import React from "react";
export default function Header() {
  let choser = 0;
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    token ? (choser = 1) : (choser = 0);
    console.log(choser);
  }, [router]);

  return (
    <>
      <header className="z-[2] flex w-full flex-row items-center justify-between px-1 py-[0.5rem] text-sm font-bold md:px-2 md:text-lg lg:px-4 lg:text-xl">
        <div className="flex flex-row gap-2 md:gap-10 lg:gap-16">
        <Link className="flex items-center gap-3 text-center" href="/">
          <Image
            src="/orionsLogo.png"
            alt="Logo de Orions Halosis"
            height={55}
            width={55}
            className="lg:w-15 p-0 md:w-14"
          />
          Orions Halosis
        </Link>
          {/* <Link className="flex items-center hover:underline" href="/wiki">
            Wiki
          </Link> */}
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
        <div className="flex flex-row">
          <Link href="/account">
            <Image src="/defaultuser1.png" alt="test" width={40} height={40} />
          </Link>
        </div>
        {/* <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Dropdown button{" "}
          <svg
            class="ms-3 h-2.5 w-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div> */}
      </header>
    </>
  );
}
