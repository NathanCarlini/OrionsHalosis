"use client";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DougChart from "@/app/components/DougChart";

function SaveInventory() {}
function logOut() {
  document.cookie = "token= ; path=/";
}
export default async function Page() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login"); // If no token is found, redirect to login page
      return;
    }
    const validateToken = async () => {
      try {
        const res = await fetch(`/api/getData`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        let body = await res.json();
        let id = body.data.iduser;
        getData(id);

        setData(body);
        if (!res.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    const getData = async (id) => {
      const resStats = await fetch(`/api/getStatsAcc`, {
        method: "PUT",
        body: JSON.stringify({ iduser: id }),
      });
      let dataStats = await resStats.json();
      setStats(dataStats);
      // WR = ((stats[1]/stats[0])*100).toFixed(1)
      setLoading(false);
    };
    validateToken();
  }, [router]);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  console.log(data.data);
  return (
    <div className="absolute flex h-full w-full flex-col bg-[url('/backgrounds/bg.png')] p-6 md:p-11">
      <section className="flex flex-row justify-between ">
        <div className="flex flex-row gap-3 ">
          <div className="relative aspect-square h-28 w-40 bg-slate-400/40 md:h-40">
            <Image
              src={"/" + data.data.avatar}
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
              Beginner space Explorer lvl.{data.data.level}
            </p>
            <div className="flex h-11 w-full flex-col items-center justify-center rounded-full bg-[url('/backgrounds/galaxy.png')]">
              <p className="self-center text-center font-bold">
                {data.data.experience} / 100
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pl-2">
          <Link
            href="/account/statistics"
            className="h-fit w-max rounded-full bg-main-blue px-4 py-2 font-bold text-white md:text-lg "
          >
            My Statistics
          </Link>
          <Link
            className="h-fit rounded-full bg-red-500 px-4 py-2 text-center font-bold text-white md:text-lg"
            href="/"
            onClick={() => {
              logOut();
              router.replace("/");
            }}
          >
            Log Out
          </Link>
        </div>
      </section>
      <section className="mb-2 mt-6 flex flex-row justify-evenly gap-2 md:mb-6 md:mt-12 md:gap-11">
        <div className="flex h-full w-full flex-col bg-slate-400/40 rounded-2xl px-6 py-4 md:px-10 md:py-10 ">
        <div className="flex h-[40%] w-[70%] flex-row gap-12  ">
          <div className=" flex h-full w-fit flex-col ">
            <p className="mb-3 text-center text-lg font-black text-white md:text-xl lg:text-2xl">
              {" "}
              WinRate
            </p>
            <DougChart data={[stats[1], stats[0] - stats[1]]} />
          </div>
          <div className="flex h-full flex-col gap-2 ">
            <div className="flex grow flex-col ">
              <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
                Your level :
              </p>
              <p className="text-center text-4xl font-black text-black">
                {stats[2]}
              </p>
            </div>
            <div className="grow ">
              <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
                Planets under your control :
              </p>
              <p className="text-center text-4xl font-black text-black">
                {stats[3]}
              </p>
            </div>
          </div>
        </div>
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
  );
}
