"use client"
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
  const router = useRouter();

  return (
    <>
      <section className="flex h-[95vh] w-full flex-col items-center justify-end">
        <iframe className="z-[1] h-full w-full object-cover" allow='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' src="https://www.youtube.com/embed/LwlacDELssg?si=E_t5BcT5tgxeeH3j&amp;controls=0&amp;autoplay=1" type="video/mp4"></iframe>
        <Link href="/game/inscription" className="w-fit bg-main-blue mb-12 z-[10] absolute p-4 rounded-3xl text-lg md:text-xl lg:text-2xl font-bold text-white duration-500 hover:text-main-blue hover:bg-white">
            Play for free
        </Link>
      </section>
      <section className="bg-random-grey pb-88 px-8 md:px-84 flex flex-col ">
        <p className="my-10 text-xl md:text-2xl lg:text-3xl font-black text-black">
          How does the game work ?
        </p>
        <div className="flex max-h-[400px] w-full flex-row justify-evenly gap-3">
          <div className="aspect-square max-h-[400px] bg-[url('/backgrounds/mars.png')] bg-cover bg-no-repeat p-2 text-base md:text-xl lg:text-2xl font-medium text-white">
            Capture planets to get resources
          </div>
          <div className="aspect-square max-h-[400px] bg-black bg-cover bg-no-repeat p-2 text-base md:text-xl lg:text-2xl font-medium text-white">
            Use cards to damage your opponent
          </div>
          <div className="aspect-square max-h-[400px] bg-[url('/Planetary_System.png')] bg-cover bg-no-repeat p-2 text-base md:text-xl lg:text-2xl font-medium text-white">
            First to capture the whole planetary system wins !
          </div>
        </div>
      </section>
      <section className="px-84 w-full bg-darkdark-blue pb-10">
        <p className="pt-10 pb-5 text-xl md:text-2xl lg:text-3xl  font-black text-white">
          Look at the data 👀
        </p>
        <div className="flex w-full flex-row items-center justify-between mb-6">
          {/* divs for graphs  */}
          <div className="flex flex-col bg-slate-400/40 justify-center w-full">
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
        </div>
        <Link href="/statistics" className="max-w-fit bg-main-blue p-2 text-lg md:text-xl lg:text-2xl font-bold text-white">
          See more data
        </Link>
      </section>
      <Footer vis="1" />
    </>
  );
}
