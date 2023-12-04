"use client"
import Image from "next/image";
import Link from "next/link";
function LogOut(){
  fetch("http://localhost:8080/logOut", { method:"PUT"})
}

function SaveInventory(){
  
}

function SaveInventory(){
  
}

export default async function Page() {
  // const res = await fetch("http://localhost:8080/checkIfSession&Data", {
  //   method: "GET",
  //   next: { tags: ["collection"] },
  // });
  // const json = await res.json();
  // return { avatar: json.avatar };


  return (
    <div className="absolute flex h-full w-full flex-col bg-[url('/backgrounds/bg.png')] p-6 md:p-11">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <div className="relative aspect-square h-28 md:h-40 w-40 bg-slate-400/40">
            <Image
              src="/defaultuser.png"
              layout="fill"
              objectFit="cover"
              alt="user avatar"
            ></Image>
          </div>
          <div className="flex h-full flex-col gap-4">
            <p className="bg-slate-400/40 px-2 py-1 w-fit text- md:text-xl font-black text-white">
              Name of User
            </p>
            <p className="bg-slate-400/40 px-2 py-1 md:text-xl font-black text-white">
              Beginner space Explorer lvl.2
            </p>
            <div className="h-11 w-full rounded-full bg-[url('/backgrounds/galaxy.png')]"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pl-2">
          <Link href="/statistics" className="h-fit w-max rounded-full bg-main-blue px-4 py-2 md:text-lg font-bold text-white ">
            My Statistics
          </Link>
          <Link
            className="h-fit rounded-full bg-red-500 px-4 py-2 text-center md:text-lg font-bold text-white"
            href="/" onClick={LogOut}
          >
            Log Out
          </Link>
        </div>
      </section>
      <section className="mb-2 md:mb-6 mt-6 md:mt-12 flex flex-row justify-evenly gap-2 md:gap-11">
        <div className="flex h-full w-full flex-col bg-slate-400/40 px-6 py-4 md:px-16 md:py-10 ">
          <p className="text-center text-xl md:text-3xl font-bold">Your infos</p>
          <form className="flex flex-col">
            <label className="mb-3 mt-3" htmlFor="username">
              Username :
            </label>
            <input
              className="md:h-10 w-full bg-white text-black"
              id="username"
              name="username"
              type="text"
            ></input>
            <label className="mb-3 mt-5" htmlFor="">
              Your e-mail :
            </label>
            <input
              className="md:h-10 w-full bg-white text-black"
              id="email"
              name="email"
              type="email"
            ></input>
            <label className="mb-3 mt-5" htmlFor="">
              Current password :
            </label>
            <input
              className="md:h-10 w-full bg-white text-black"
              id="password"
              name="password"
              type="password"
            ></input>
            <label className="mb-3 mt-5" htmlFor="">
              New password :
            </label>
            <input
              className="mb-8 md:h-10 w-full bg-white text-black"
              id=""
              name=""
              type="text"
            ></input>
          </form>
        </div>
        <div className="flex h-full w-full flex-col bg-slate-400/40 px-6 py-4 md:px-16 md:py-10">
          <p className="text-xl md:text-3xl font-bold text-center">Inventory</p>
          <div>
            <p className="text-base md:text-xl font-black text-black">Choose a Spacecraft</p>
            <div className="flex flex-row">
              {/* <ItemRenderLoop array={test} /> */}
            </div>
          </div>
          <div>
            <p className="text-base md:text-xl font-black text-black">Choose a Title</p>
            <div className="flex flex-row">
              {/* <ItemRenderLoop array={test} /> */}
            </div>
          </div>
          <Link
            className="h-fit rounded-full bg-tropical-green px-4 py-2 text-center md:text-lg font-bold text-white"
            href="/" onClick={SaveInventory}
          >
            Save
          </Link>
        </div>
      </section>
    </div>
  );
}
