"use client";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// import useFetch from "./useFetch.js";
function SaveInventory() {}
export default async function Page() {
  let doto;
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      // router.replace("/"); // If no token is found, redirect to login page
      return;
    }
    const validateToken = async () => {
      try {
        const res = await fetch("/api/getData", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        doto = res;
        // console.log(res);
        if (!res.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/"); // Redirect to login if token validation fails
      }
    };
    validateToken();
  }, [router]);

  //console.log(token);
  return doto ? (
    <div className="absolute flex h-full w-full flex-col bg-[url('/backgrounds/bg.png')] p-6 md:p-11">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <div className="relative aspect-square h-28 w-40 bg-slate-400/40 md:h-40">
            <Image
              src=""
              layout="fill"
              objectFit="cover"
              alt="user avatar"
            ></Image>
          </div>
          <div className="flex h-full flex-col gap-4">
            <p className="text- w-fit bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
              ''
            </p>
            <p className="bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
              Beginner space Explorer lvl.2
            </p>
            <div className="h-11 w-full rounded-full bg-[url('/backgrounds/galaxy.png')]"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pl-2">
          <Link
            href="/statistics"
            className="h-fit w-max rounded-full bg-main-blue px-4 py-2 font-bold text-white md:text-lg "
          >
            My Statistics
          </Link>
          <Link
            className="h-fit rounded-full bg-red-500 px-4 py-2 text-center font-bold text-white md:text-lg"
            href="/" //onClick={LogOut}
          >
            Log Out
          </Link>
        </div>
      </section>
      <section className="mb-2 mt-6 flex flex-row justify-evenly gap-2 md:mb-6 md:mt-12 md:gap-11">
        <div className="flex h-full w-full flex-col bg-slate-400/40 px-6 py-4 md:px-16 md:py-10 ">
          <p className="text-center text-xl font-bold md:text-3xl">
            Your infos
          </p>
          <form className="flex flex-col">
            <label className="mb-3 mt-3" htmlFor="username">
              Username :
            </label>
            <input
              className="w-full bg-white text-black md:h-10"
              id="username"
              name="username"
              type="text"
            ></input>
            <label className="mb-3 mt-5" htmlFor="">
              Your e-mail :
            </label>
            <input
              className="w-full bg-white text-black md:h-10"
              id="email"
              name="email"
              type="email"
            ></input>
            <label className="mb-3 mt-5" htmlFor="">
              Current password :
            </label>
            <input
              className="w-full bg-white text-black md:h-10"
              id="password"
              name="password"
              type="password"
            ></input>
            <label className="mb-3 mt-5" htmlFor="">
              New password :
            </label>
            <input
              className="mb-8 w-full bg-white text-black md:h-10"
              id=""
              name=""
              type="text"
            ></input>
          </form>
        </div>
        <div className="flex h-full w-full flex-col bg-slate-400/40 px-6 py-4 md:px-16 md:py-10">
          <p className="text-center text-xl font-bold md:text-3xl">Inventory</p>
          <div>
            <p className="text-base font-black text-black md:text-xl">
              Choose a Spacecraft
            </p>
            <div className="flex flex-row">
              {/* <ItemRenderLoop array={test} /> */}
            </div>
          </div>
          <div>
            <p className="text-base font-black text-black md:text-xl">
              Choose a Title
            </p>
            <div className="flex flex-row">
              {/* <ItemRenderLoop array={test} /> */}
            </div>
          </div>
          <Link
            className="h-fit rounded-full bg-tropical-green px-4 py-2 text-center font-bold text-white md:text-lg"
            href="/" //onClick={SaveInventory}
          >
            Save
          </Link>
        </div>
      </section>
    </div>
  ) : (
    <></>
  );
}
