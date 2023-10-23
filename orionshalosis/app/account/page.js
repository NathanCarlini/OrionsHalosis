import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="absolute flex h-full w-full flex-col bg-[url('/bg.png')] p-11">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Image
            src="/defaultuser.png"
            width={70}
            height={70}
            alt="user avatar"
          ></Image>
          <div className="flex flex-col">
            <p className="bg-slate-400/30 px-4 py-2 text-xl font-black text-white">
              Name of User
            </p>
            <p className="bg-slate-400/30 px-4 py-2 text-xl font-black text-white">
              Beginner space Explorer lvl.2
            </p>
            <div></div>
          </div>
        </div>
        <button>My Statistics</button>
      </section>
      <section className="flex flex-row">
        <div></div>
        <div></div>
      </section>
    </div>
  );
}
