"use client";
import MyThree from './static/script.js';
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const router = useRouter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [isLoading, setLoading] = useState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, setData] = useState(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const currentUrl = window.location.hostname;
        const currentUrlProt = window.location.protocol;
        const currentUrlPort = window.location.port;
        const token = Cookies.get("token");
        if (!token) {
        router.replace("/login"); // If no token is found, redirect to login page
        return;
        }
        const validateToken = async () => {
        const currentUrl = window.location.hostname;
        const currentUrlProt = window.location.protocol;
        const currentUrlPort = window.location.port;

        try {
            const res = await fetch(`/api/getData`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            });
            let body = await res.json();
            setData(body);
            setLoading(false);
            if (!res.ok) throw new Error("Token validation failed");
        } catch (error) {
            console.error(error);
            router.replace("/login"); // Redirect to login if token validation fails
        }
        };
        validateToken();
    }, [router]);
    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;
    // console.log(data.data);

    return (
        <div className='bg-black'>
            <p className="halosis absolute top-5 w-full text-center z-10 text-2xl block text-white select-none">Welcome to Orion's Halosis {data.data.username}!</p>
            <p className="waiting absolute top-1/2 w-full text-center z-10 text-xl select-none">Waiting for another player to join...</p>
            <p className="resource hidden absolute left-4 bottom-4 w-full text-left z-10 text-xl text-white select-none">Moon Stone : </p>
            <p className="resource2 hidden absolute bottom-4 w-full text-center z-10 text-xl text-white select-none">Moon Stone p2 : 0</p>
            <p className="timer hidden absolute bottom-4 right-4 z-10 text-white select-none text-xl">Timer : 20</p>
            <MyThree props={data.data}/>
        </div>
    );
}