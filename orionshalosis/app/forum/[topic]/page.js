"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
export default function Page() {

  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [data, setData] = useState(null);
  let Name = "Q&A";

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login"); // If no token is found, redirect to login page
      return;
    }
    const validateToken = async () => {
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

    const getPost = async () => {
      try {
        const post = await fetch(`/api/forum/`, {
          method: "PUT",
          body: JSON.stringify({ topicname: Name }),
        });
        let postBody = await post.json();
        setPostData(postBody);
        console.log(postData);
        setLoading(false);
        if (!post.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    getPost();
  }, [router]);
  if (isLoading) return <p>Loading...</p>;
  if (!postData) return <p>No profile data</p>;

  return (
    <div className="absolute flex h-full w-full flex-col p-6">
      <h1 className="text-4xl font-sans font-bold w-full text-center mb-12">{Name} </h1>
      <div className="grid grid-cols-3 w-full h-full">

      {/* ici profil */}
        <div className="flex w-fit flex-row justify-between bg-red-500">
          <div className="flex flex-row gap-5">
            <div className="relative aspect-square h-28 w-40 bg-slate-400/40 md:h-40">
              <Image
                src="/Ornn_0.jpg"
                layout="fill"
                objectFit="cover"
                alt="user avatar"
              ></Image>
            </div>
            <div className="flex h-full flex-col gap-4">
              <p className="text- w-fit bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
                {data.data.username}
              </p>
              <p className="bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
                Beginner space Explorer lvl.5
              </p>
              <div className="flex h-11 w-full flex-col items-center justify-center rounded-full bg-[url('/backgrounds/galaxy.png')]">
                <p className="self-center text-center font-bold">
                  {data.data.experience} / 100
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-500">sdfshffgjsgdfjsdhgfjg</div>
        <div className="bg-blue-500">sdfshffgjsgdfjsdhgfjg</div>
      </div>
    </div>
  );
}
