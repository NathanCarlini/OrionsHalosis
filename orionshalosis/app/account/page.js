import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="absolute flex h-full w-full flex-col bg-[url('/bg.png')] p-11">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <div className="aspect-square bg-slate-400/40 w-40 h-40 relative">
            <Image
              src="/defaultuser.png"
              layout="fill"
              objectFit="cover"
              alt="user avatar"
            ></Image>
          </div>
          <div className="flex flex-col h-full gap-4">
            <p className="bg-slate-400/40 px-4 py-[6px] text-xl font-black text-white">
              Name of User
            </p>
            <p className="bg-slate-400/40 px-4 py-[6px] text-xl font-black text-white">
              Beginner space Explorer lvl.2
            </p>
            <div className="w-full rounded-full h-11 bg-[url('/galaxy.png')]"></div>
          </div>
        </div>
        <button className="rounded-full bg-main-blue text-white font-bold text-lg py-2 px-4 h-fit ">My Statistics</button>
      </section>
      <section className="flex flex-row mb-6 justify-evenly mt-12">
        <div className="h-full bg-slate-400/40 py-10 px-16"><p className="text-3xl font-bold">Your infos</p></div>
        <div className="h-full bg-slate-400/40 py-10 px-16"><p className="text-3xl font-bold">Inventory</p></div>
      </section>
    </div>
  );
}
