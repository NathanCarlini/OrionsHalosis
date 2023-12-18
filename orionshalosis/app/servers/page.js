"use client";


import Image from "next/image";
import Link from "next/link";
function LogOut(){
    fetch(`http://${process.env.CURRENT_URL}:8080/logOut`, { method:"PUT"})
}

export default function Page() {
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
                        className="h-fit rounded-full bg-main-red px-4 py-2 text-center md:text-lg font-bold text-white"
                        href="/" onClick={LogOut}
                    >
                        Log Out
                    </Link>
                </div>
            </section>
            <section className="flex flex-col bg-gray-400/60 mt-4 p-3 md:mt-8 md:p-4">
                <h1 className="text-center text-xl md:text-2xl text-black font-bold mb-4">List of servers open</h1>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="80"
                        height="80"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Name of the server</a>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Difficulty 1</a>
                    <a className="bg-main-blue font-bold py-2 px-3 h-fit cursor-pointer">Join as spectator</a>
                    <a className="bg-tropical-green font-bold py-2 px-3 h-fit">1/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="80"
                        height="80"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Name of the server</a>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Difficulty 2</a>
                    <a className="bg-main-blue font-bold py-2 px-3 h-fit cursor-pointer">Join as spectator</a>
                    <a className="bg-main-red font-bold py-2 px-3 h-fit">2/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="80"
                        height="80"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Name of the server</a>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Difficulty 3</a>
                    <a className="bg-main-blue font-bold py-2 px-3 h-fit cursor-pointer">Join as spectator</a>
                    <a className="bg-main-red font-bold py-2 px-3 h-fit">2/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="80"
                        height="80"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Name of the server</a>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Difficulty 4</a>
                    <a className="bg-main-blue font-bold py-2 px-3 h-fit cursor-pointer">Join as spectator</a>
                    <a className="bg-tropical-green font-bold py-2 px-3 h-fit">1/2</a>
                </div>
                <hr className="border my-4 w-3/4 ml-auto mr-auto"></hr>
                <div className="flex flex-row justify-between items-center">
                    <Image
                        src="/mapSolarSystem.png"
                        width="80"
                        height="80"
                        alt="image map server">
                    </Image>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Name of the server</a>
                    <a className="bg-gray-600 font-bold py-2 px-3 h-fit">Difficulty 5</a>
                    <a className="bg-main-blue font-bold py-2 px-3 h-fit cursor-pointer">Join as spectator</a>
                    <a className="bg-tropical-green font-bold py-2 px-3 h-fit">1/2</a>
                </div>
            </section>
        </div>
    );
}