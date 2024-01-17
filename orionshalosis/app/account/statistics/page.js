"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DougChart from "@/app/components/DougChart";

export default function Page() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const router = useRouter();
  let WR;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [isLoading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
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
        if (!res.ok) throw new Error("Token validation failed");
        let id = body.data.iduser;
        getData(id);
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    validateToken();
    const getData = async (id) => {
      const resStats = await fetch(`http://localhost:3000/api/getStatsAcc`, {
        method: "PUT",
        body: JSON.stringify({ iduser: id }),
      });
      let dataStats = await resStats.json();
      setStats(dataStats);
      // WR = ((stats[1]/stats[0])*100).toFixed(1)
      setLoading(false);
    };
  }, [router]);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  console.log(data, stats);

  return (
    <div className="absolute h-full w-full bg-[url('/backgrounds/bg.png')] p-12 ">
      <h1 className="p-8 pt-2 text-center text-2xl font-black text-white md:text-3xl lg:text-4xl">
        Your personal statistics
      </h1>
      {/* <div className="flex flex-col justify-center bg-slate-400/40">
        <ul className="inline-flex justify-between px-6 py-2">
          <li className="flex flex-col">
            <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
              Games :
            </p>
            <p className="text-center text-4xl font-black text-black">
              {stats[0]}
            </p>
          </li>
          <li className="flex flex-col">
            <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
              Wins :
            </p>
            <p className="text-center text-4xl font-black text-black">
              {stats[1]}
            </p>
          </li>
          <li className="flex flex-col">
            <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
              Your level :
            </p>
            <p className="text-center text-4xl font-black text-black">
              {stats[2]}
            </p>
          </li>
          <li className="flex flex-col">
            <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
              Planets under your control :
            </p>
            <p className="text-center text-4xl font-black text-black">
              {stats[3]}
            </p>
          </li>
        </ul>
      </div> */}
      <div className="h-full w-full bg-slate-400/40">
        <div className="flex h-[40%] w-[70%] flex-row gap-2  ">
          <div className=" flex h-full max-w-[60%] flex-col ">
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
    </div>
  );
}
