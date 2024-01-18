"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function getData() {
      const res = await fetch(`/api/getStatsHome`, {
        method: "GET",
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
    <>
      <section className="flex h-[95vh] w-full flex-col items-center justify-end">
        <video
          autoPlay
          muted
          loop
          disablePictureInPicture
          className="top absolute z-[1] h-full w-full object-cover"
        >
          <source src="/mars101.mp4" type="video/mp4" />
        </video>{" "}
        <Link
          href="/game/inscription"
          className="absolute z-[10] mb-12 w-fit rounded-3xl bg-main-blue p-4 text-lg font-bold text-white duration-500 hover:bg-white hover:text-main-blue md:text-xl lg:text-2xl"
        >
          Play for free
        </Link>
      </section>
      <section className="flex flex-col bg-random-grey px-8 pb-88 md:px-84 ">
        <p className="my-10 text-xl font-black text-black md:text-2xl lg:text-3xl">
          How does the game work ?
        </p>
        <div className="flex max-h-[400px] w-full flex-row justify-evenly gap-3">
          <div className="aspect-square max-h-[400px] bg-[url('/backgrounds/mars.png')] bg-cover bg-no-repeat p-2 text-base font-medium text-white md:text-xl lg:text-2xl">
            Capture planets to get resources
          </div>
          <div className="aspect-square max-h-[400px] bg-[url('/mapSolarSystem.png')] bg-cover bg-no-repeat p-2 text-base font-medium text-white md:text-xl lg:text-2xl">
            Be strategic to overcome your opponent
          </div>
          <div className="aspect-square max-h-[400px] bg-[url('/Planetary_System.png')] bg-cover bg-no-repeat p-2 text-base font-medium text-white md:text-xl lg:text-2xl">
            First to capture the whole planetary system wins !
          </div>
        </div>
      </section>
      <section className="w-full bg-darkdark-blue px-84 pb-10">
        <p className="pb-5 pt-10 text-xl font-black text-white  md:text-2xl lg:text-3xl">
          Look at the data 👀
        </p>
        <div className="mb-6 flex w-full flex-row items-center justify-between">
          {/* divs for graphs  */}
          <div className="flex w-full flex-col justify-center bg-slate-400/40">
            <ul className="inline-flex justify-between px-6 py-2">
              <li className="flex flex-col">
                <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
                  Games :
                </p>
                <p className="text-center text-4xl font-black text-black">
                  {data[0]}
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
                  Players overall :
                </p>
                <p className="text-center text-4xl font-black text-black">
                  {data[1]}
                </p>
              </li>
              <li className="flex flex-col">
                <p className="text-center text-lg font-black md:text-xl lg:text-2xl">
                  Active players :
                </p>
                <p className="text-center text-4xl font-black text-black">
                  {data[2]}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <Link
          href="/statistics"
          className="max-w-fit bg-main-blue p-2 text-lg font-bold text-white md:text-xl lg:text-2xl"
        >
          See more data
        </Link>
      </section>
      <Footer vis="1" />
    </>
  );
}
