"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
  async function getData(){
    const res = await fetch(`http://localhost:3000/api/getStatsHome`, {
      method: "GET"
    });
    let data = await res.json();
    setData(data);
    setLoading(false);
  }
  getData();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
    return (
        <div className="h-full w-full bg-[url('/backgrounds/bg.png')] p-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white text-center p-8 pt-2">Global statistics</h1>
            <div className="flex flex-col bg-slate-400/40 justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white text-center p-4">Servers stats :</h2>
                <ul className="inline-flex py-2 px-6 justify-between">
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Games :</p>
                        <p className="font-black text-black text-4xl text-center">{data[0]}</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Players overall :</p>
                        <p className="font-black text-black text-4xl text-center">{data[1]}</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Active players :</p>
                        <p className="font-black text-black text-4xl text-center">{data[2]}</p>
                    </li>
                </ul>
            </div>
            <ul className="flex flex-col bg-slate-400/40 py-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white text-center p-4">Top 5 players :</h2>
                <li className="inline-flex py-2 justify-between px-6 items-center">
                    <div className="flex flex-row items-center gap-4">
                        <Image
                            src="/defaultuser.png"
                            alt="Logo de Orions Halosis"
                            height={40}
                            width={40}
                            className="lg:w-15 p-0 md:w-14"
                        />
                        <p className="font-black md:text-lg lg:text-xl">Username</p>
                    </div>
                    <p className="md:text-lg lg:text-xl">title</p>
                    <p className="md:text-lg lg:text-xl">number of wins</p>
                    <p className="md:text-lg lg:text-xl">level</p>
                </li>
                <li className="inline-flex py-2 justify-between px-6">
                    <div className="flex flex-row items-center gap-4">
                        <Image
                            src="/defaultuser.png"
                            alt="Logo de Orions Halosis"
                            height={40}
                            width={40}
                            className="lg:w-15 p-0 md:w-14"
                        />
                        <p className="font-black md:text-lg lg:text-xl">Username</p>
                    </div>
                    <p className="md:text-lg lg:text-xl">title</p>
                    <p className="md:text-lg lg:text-xl">number of wins</p>
                    <p className="md:text-lg lg:text-xl">level</p>
                </li>
                <li className="inline-flex py-2 justify-between px-6">
                    <div className="flex flex-row items-center gap-4">
                        <Image
                            src="/defaultuser.png"
                            alt="Logo de Orions Halosis"
                            height={40}
                            width={40}
                            className="lg:w-15 p-0 md:w-14"
                        />
                        <p className="font-black md:text-lg lg:text-xl">Username</p>
                    </div>
                    <p className="md:text-lg lg:text-xl">title</p>
                    <p className="md:text-lg lg:text-xl">number of wins</p>
                    <p className="md:text-lg lg:text-xl">level</p>
                </li>
                <li className="inline-flex py-2 justify-between px-6">
                    <div className="flex flex-row items-center gap-4">
                        <Image
                            src="/defaultuser.png"
                            alt="Logo de Orions Halosis"
                            height={40}
                            width={40}
                            className="lg:w-15 p-0 md:w-14"
                        />
                        <p className="font-black md:text-lg lg:text-xl">Username</p>
                    </div>
                    <p className="md:text-lg lg:text-xl">title</p>
                    <p className="md:text-lg lg:text-xl">number of wins</p>
                    <p className="md:text-lg lg:text-xl">level</p>
                </li>
                <li className="inline-flex py-2 justify-between px-6">
                    <div className="flex flex-row items-center gap-4">
                        <Image
                            src="/defaultuser.png"
                            alt="Logo de Orions Halosis"
                            height={40}
                            width={40}
                            className="lg:w-15 p-0 md:w-14"
                        />
                        <p className="font-black md:text-lg lg:text-xl">Username</p>
                    </div>
                    <p className="md:text-lg lg:text-xl">title</p>
                    <p className="md:text-lg lg:text-xl">number of wins</p>
                    <p className="md:text-lg lg:text-xl">level</p>
                </li>
            </ul>
            <Link href="/account/statistics"className="flex justify-center text-xl md:text-2xl lg:text-3xl font-black text-white hover:underline hover:cursor-pointer text-center pt-8"> Click here to find your personal statistics</Link>

        </div>
    );
}

