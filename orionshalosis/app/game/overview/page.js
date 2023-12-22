"use client";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import uuid4 from "uuid4";


export default function Page() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [isLoading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [data, setData] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const currentUrl = window.location.hostname;
    const currentUrlProt = window.location.protocol;
    const currentUrlPort = window.location.port;


    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login"); // If no token is found, redirect to login page
      return;
    }
    const validateToken = async () => {
      try {
        const res = await fetch(`/api/getData`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        let body = await res.json();
        setData(body);
        console.log(data);
        setLoading(false);
        if (!res.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    validateToken();
  }, [router]);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  console.log(data.data);
  return (
    <div className="absolute pt-2 md:pt-8 flex h-full w-full gap-10 flex-row justify-between bg-[url('/backgrounds/bg.png')] p-6 md:p-11">
      <section className="flex flex-col gap-3">
      <div className="flex w-fit flex-row justify-between">
        <div className="flex flex-row gap-5">
          <div className="relative aspect-square h-28 w-40 bg-slate-400/40 md:h-40">
            <Image
              src="/Ornn_0.jpg"
              layout="fill"
              objectFit="cover"
              alt="user avatar"
            ></Image>
          </div>
          <div className="flex h-full flex-col gap-4">
            <p className="text- w-fit bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
              {data.data.username}
            </p>
            <p className="bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
              Beginner space Explorer lvl.5
            </p>
            <div className="flex h-11 w-full flex-col items-center justify-center rounded-full bg-[url('/backgrounds/galaxy.png')]">
              <p className="self-center text-center font-bold">
                {data.data.experience} / 100
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full bg-slate-400/40">

      </div>
      </section>
      <section className="h-full w-[60%] bg-slate-400/40 p-3 md:p-4">
        <h1 className="mb-4 text-center text-xl font-bold text-white md:text-2xl">
          List of servers open
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between">
            <Image
              src="/mapSolarSystem.png"
              width="80"
              height="80"
              alt="image map server"
            ></Image>
            <a className="h-fit bg-gray-600 px-3 py-2 font-bold">
              Name of the server
            </a>
            <a className="h-fit bg-gray-600 px-3 py-2 font-bold">
              Difficulty 1
            </a>
            <a className="h-fit cursor-pointer bg-main-blue px-3 py-2 font-bold">
              Join as spectator
            </a>
            <a className="h-fit bg-tropical-green px-3 py-2 font-bold">1/2</a>
          </div>
        </div>
        <p
            onClick={async() => {
              const gameId = uuid4();
              data.data.gameId = gameId;
              await fetch(`https://orions-halosis.vercel.app/api/gameResult`, {
                method: "POST",
                body: JSON.stringify({
                  player1:data.data.iduser, player2:data.data.iduser, victory: null, gamedate: new Date(), player1resources: 0, player2resources: 0, player1planets: 1, player2planets: 1, gameidentificator:gameId
                }),
              });
              router.push(`/game/${gameId}`);
            }}
            className="h-fit w-fit bg-main-blue px-3 py-2 font-bold">
          Create a server
        </p>
      </section>
    </div>
  );
}
