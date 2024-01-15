"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Page() {
    return (
        <div className="h-full w-full bg-[url('/backgrounds/bg.png')] p-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white text-center p-8 pt-2">Your personal statistics</h1>
            <div className="flex flex-col bg-slate-400/40 justify-center">
                <ul className="inline-flex py-2 px-6 justify-between">
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Games :</p>
                        <p className="font-black text-black text-4xl text-center">10</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Wins :</p>
                        <p className="font-black text-black text-4xl text-center">7</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Your level :</p>
                        <p className="font-black text-black text-4xl text-center">3</p>
                    </li>
                    <li className="flex flex-col">
                        <p className="font-black text-lg md:text-xl lg:text-2xl text-center">Planets under your control :</p>
                        <p className="font-black text-black text-4xl text-center">300</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

