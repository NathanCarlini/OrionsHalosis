"use client";
import { useState } from "react";
import { revalidateTag } from "next/cache";

export default function Page() {
  var data = {};
  const date = new Date();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "defaultuser.png",
    creationDate: date,
  });

  const handleInput = (e) => {
    if (e.target.id != "rePassword") {
      const fieldName = e.target.id;
      const fieldValue = e.target.value;
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
      Object.entries(formData).forEach(([key, value]) => {
        data[key] = value;
      });
    }
  };

  function checkPwd() {
    const rePwd = document.getElementById("rePassword");
    console.log(rePwd.value);
    console.log(formData.password);
    if (rePwd.value != formData.password) {
      document.getElementById("sendBtn").disabled = true;
    }
  }

  async function submitForm() {
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = value;
    });
    console.log(data);
    // try {
    await fetch("http://localhost:8080/userCreation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("a");
    window.location.replace("http://localhost:3000/account");
  }

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-between bg-[url('/backgrounds/galaxy.png')] bg-cover bg-no-repeat pb-20 pt-20">
      <form className="flex w-[50vw] flex-col justify-between gap-5 bg-white p-8 lg:h-[70vh] lg:w-[35vw]">
        <h1 className="text-center text-3xl font-bold capitalize text-black">
          Create an account
        </h1>
        <div className="">
          <label
            htmlFor="username"
            className="text-xl font-bold text-black focus:border focus:border-black focus:decoration-transparent"
          >
            Username :
          </label>
          <input
            onChange={handleInput}
            type="text"
            id="username"
            name="username"
            className="h-12 w-full border-0 bg-random-grey text-black focus:outline-black"
          ></input>
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="text-xl font-bold text-black focus:border focus:border-black focus:decoration-transparent"
          >
            E-mail :
          </label>
          <input
            onChange={handleInput}
            type="email"
            name="email"
            id="email"
            className="h-12 w-full border-0 bg-random-grey text-black focus:outline-black"
          ></input>
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-xl font-bold text-black focus:border focus:border-black focus:decoration-transparent"
          >
            Password :
          </label>
          <input
            onChange={handleInput}
            type="password"
            name="password"
            id="password"
            className="h-12 w-full border-0 bg-random-grey text-black focus:outline-black"
          ></input>
        </div>

        <div>
          <label
            htmlFor="rePassword"
            className="text-xl font-bold text-black focus:border focus:border-black focus:decoration-transparent"
          >
            Repeat Password :
          </label>
          <input
            onChange={handleInput}
            onBlur={checkPwd}
            type="password"
            name="rePassword"
            id="rePassword"
            className="h-12 w-full border-0 bg-random-grey text-black focus:outline-black"
          />
        </div>

        <div className="mt-2 flex grow flex-col justify-evenly">
          <p
            id="sendBtn"
            onClick={submitForm}
            className="w-full max-w-[200px] self-center rounded-full bg-black px-12 py-5 text-center text-xl font-black capitalize text-white duration-300 hover:bg-slate-500"
          >
            Sign Up
          </p>
        </div>
      </form>
    </div>
  );
}
