"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  var data = {};
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = value;
    });
  };
  async function submitForm() {
    const currentUrl = window.location.hostname;
    const currentUrlProt = window.location.protocol;
    const currentUrlPort = window.location.port;
    setLoading(true);
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = value;
    });
    console.log(data);
    try {
      const res = await fetch(`${currentUrlProt}//${currentUrl}/api/createUsr`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let { token } = await res.json();
      console.log(token);
      document.cookie = `token=${token}; path=/`;
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-[url('/backgrounds/galaxy.png')] bg-cover bg-no-repeat pb-20 pt-20">
      <section className="flex w-[70vw] flex-col gap-5 bg-random-grey p-8 lg:h-[70vh] lg:w-[45vw]">
        <h1 className="text-center text-3xl font-bold capitalize text-black">
          Log In
        </h1>
        <div className="">
          <p className="text-xl font-bold">Email :</p>
          <input
            onChange={handleInput}
            type="text"
            id="email"
            className="h-8 w-full border border-black text-black"
          ></input>
        </div>
        <div>
          <p className="text-xl font-bold">Password :</p>
          <input
            onChange={handleInput}
            type="password"
            id="password"
            className="h-8 w-full border border-black text-black"
          ></input>
          <p className="text-blue-700">You forgot your password ?</p>
        </div>
        <div className="mb-6 mt-2 flex grow flex-col justify-evenly">
          <p
            onClick={() => {
              submitForm();
              function loaderRouter() {
                if (isLoading == true) {
                  window.setTimeout(loaderRouter, 800);
                  console.log("boucle");
                } else {
                  router.push("/");
                }
              }
              loaderRouter();
            }}
            className="w-full max-w-[200px] self-center rounded-full bg-black px-12 py-2 text-center text-xl font-black capitalize text-white duration-300 hover:bg-slate-500"
          >
            Login
          </p>
          <p>Create an account : </p>
          <Link
            href="/signup"
            className="w-full max-w-[175px] self-center rounded-full bg-black px-12 py-2 text-center text-xl font-black capitalize text-white duration-300 hover:bg-slate-500"
          >
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
}
