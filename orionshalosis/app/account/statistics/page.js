"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Page() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const router = useRouter();
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
        getData(id)
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    validateToken();
    const getData = async (id) => {
        const resStats = await fetch(`http://localhost:3000/api/getStatsAcc`, {
            method: "PUT",
            body: JSON.stringify({"iduser":id}),
        });
        let dataStats = await resStats.json();
        setStats(dataStats);
        setLoading(false);
    }
    
  }, [router]);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  console.log(data, stats);

    return (
        <div className="h-full w-full bg-[url('/backgrounds/bg.png')] p-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white text-center p-8 pt-2">Your personal statistics</h1>
            <div className="flex flex-col bg-slate-400/40 justify-center">
                <ul className="inline-flex py-2 px-6 justify-between">
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Games :</p>
                        <p className="font-black text-black text-4xl text-center">{stats[0]}</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Wins :</p>
                        <p className="font-black text-black text-4xl text-center">{stats[1]}</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Your level :</p>
                        <p className="font-black text-black text-4xl text-center">{stats[2]}</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Planets under your control :</p>
                        <p className="font-black text-black text-4xl text-center">{stats[3]}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

