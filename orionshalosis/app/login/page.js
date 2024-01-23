"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default function Page() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  var data = {};
  const [formData, setFormData] = useState({
    username: "",
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
    setLoading(true);
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = value;
    });
    console.log(data);
    try {
      const res = await fetch(`/api/loginUsr`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let { token } = await res.json();
      console.log(token);
      document.cookie = `token=${token}; path=/`;
      // await sleep(3000);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-[url('/backgrounds/galaxy.png')] bg-cover bg-no-repeat pb-20 pt-20">
      <section className="flex w-[70vw] flex-col gap-5 bg-random-grey/80 p-8 lg:h-[50vh] lg:w-[35vw] rounded-2xl">
        <h1 className="text-center text-3xl font-bold capitalize text-marine-blue">
          Log In
        </h1>
        <div className="">
          <p className="text-xl font-bold text-marine-blue">Username :</p>
          <input
            onChange={handleInput}
            type="text"
            id="username"
            className="h-12 w-full border-black text-marine-blue border-0"
          ></input>
        </div>
        <div>
          <p className="text-xl font-bold text-marine-blue">Password :</p>
          <input
            onChange={handleInput}
            type="password"
            id="password"
            className="h-12 w-full border-black text-black border-0"
          ></input>
          <p className="text-marine-blue">You forgot your password ?</p>
        </div>
        <div className=" mt-2 flex grow flex-col justify-evenly gap-3">
          <p
            onClick={async () => {
              submitForm();
              await sleep(3000);
              router.push("/")
            }}
            className="w-full max-w-[200px] cursor-pointer self-center rounded-full bg-marine-blue px-12 py-2 text-center text-xl font-black capitalize text-white duration-300 hover:bg-slate-500"
          >
            Login
          </p>
          <p className="text-marine-blue">Create an account : </p>
          <Link
            href="/signup"
            className="w-full max-w-[175px] cursor-pointer self-center rounded-full bg-marine-blue px-12 py-2 text-center text-xl font-black capitalize text-white duration-300 hover:bg-slate-500"
          >
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
}
