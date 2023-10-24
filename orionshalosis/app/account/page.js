import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="absolute flex h-full w-full flex-col bg-[url('/backgrounds/bg.png')] p-11">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <div className="relative aspect-square h-40 w-40 bg-slate-400/40">
            <Image
              src="/defaultuser.png"
              layout="fill"
              objectFit="cover"
              alt="user avatar"
            ></Image>
          </div>
          <div className="flex h-full flex-col gap-4">
            <p className="bg-slate-400/40 px-4 py-[6px] text-xl font-black text-white">
              Name of User
            </p>
            <p className="bg-slate-400/40 px-4 py-[6px] text-xl font-black text-white">
              Beginner space Explorer lvl.2
            </p>
            <div className="h-11 w-full rounded-full bg-[url('/backgrounds/galaxy.png')]"></div>
          </div>
        </div>
        <button className="h-fit rounded-full bg-main-blue px-4 py-2 text-lg font-bold text-white ">
          My Statistics
        </button>
      </section>
      <section className="mb-6 mt-12 flex flex-row justify-evenly gap-11">
        <div className="flex h-full flex-col bg-slate-400/40 px-16 py-10 w-full ">
          <p className="text-3xl font-bold text-center">Your infos</p>
          <form className="flex flex-col">
            <label className="mb-3" htmlFor="username">Username :</label>
            <input className="bg-white text-black h-10 w-full" id="username" name="username" type="text" ></input>

            <label className="mt-5 mb-3" htmlFor="">Your e-mail :</label>
            <input className="bg-white text-black h-10 w-full" id="email" name="email" type="email" ></input>

            <label className="mt-5 mb-3" htmlFor="">Current password :</label>
            <input className="bg-white text-black h-10 w-full" id="password" name="password" type="password" ></input>

            <label className="mt-5 mb-3" htmlFor="">New password :</label>
            <input className="bg-white text-black h-10 w-full mb-8" id="" name="" type="text"></input>
          </form>
        </div>
        <div className="flex h-full flex-col bg-slate-400/40 px-16 py-10 w-full">
          <p className="text-3xl font-bold">Inventory</p>
          <div>
            <p className="text-black font-black text-xl">Spacecraft</p>
            <div className="flex flex-row">
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
