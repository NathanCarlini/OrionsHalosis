"use client";
import Image from "next/image";
import Link from "next/link";

function LogOut(){
    fetch("http://localhost:8080/logOut", { method:"PUT"})
}

export default function Page() {
    return (
        <div className="flex h-full w-full flex-col bg-[url('/backgrounds/bg.png')] p-11">
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
                <div className="flex flex-col gap-5">
                    <Link className="h-fit rounded-full bg-main-blue px-4 py-2 text-lg font-bold text-white "
                    href="/account">
                    My Profile
                    </Link>
                    <Link
                    className="h-fit rounded-full bg-red-500 px-4 py-2 text-center text-lg font-bold text-white"
                    href="/" onClick={LogOut}
                    >
                    Log Out
                    </Link>
                </div>
            </section>
            <section className="flex flex-col bg-gray-400/70 mt-8 p-4">
                <h1 className="text-center text-2xl text-black font-bold mb-4">List of servers open</h1>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="100"
                        height="100"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit">Name of the serveur</a>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit text-[#84F042]">Difficulty 1</a>
                    <a className="bg-[#523FFC] font-bold py-2 px-4 h-fit">Join as spectator</a>
                    <a className="bg-[#84F042] font-bold py-2 px-4 h-fit">1/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="100"
                        height="100"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit">Name of the serveur</a>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit text-[#DDEC30]">Difficulty 2</a>
                    <a className="bg-[#523FFC] font-bold py-2 px-4 h-fit">Join as spectator</a>
                    <a className="bg-[#FF0000] font-bold py-2 px-4 h-fit">2/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="100"
                        height="100"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit">Name of the serveur</a>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit text-[#FFB932]">Difficulty 3</a>
                    <a className="bg-[#523FFC] font-bold py-2 px-4 h-fit">Join as spectator</a>
                    <a className="bg-[#FF0000] font-bold py-2 px-4 h-fit">2/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="100"
                        height="100"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit">Name of the serveur</a>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit text-[#FF3A3A]">Difficulty 4</a>
                    <a className="bg-[#523FFC] font-bold py-2 px-4 h-fit">Join as spectator</a>
                    <a className="bg-[#84F042] font-bold py-2 px-4 h-fit">1/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="100"
                        height="100"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit">Name of the serveur</a>
                    <a className="bg-gray-600 font-bold py-2 px-4 h-fit text-[#770000]">Difficulty 5</a>
                    <a className="bg-[#523FFC] font-bold py-2 px-4 h-fit">Join as spectator</a>
                    <a className="bg-[#84F042] font-bold py-2 px-4 h-fit">1/2</a>
                </div>
            </section>
        </div>
    );
}