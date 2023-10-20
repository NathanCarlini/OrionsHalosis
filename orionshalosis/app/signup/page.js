"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  var data = {};
  const [formData, setFormData] = useState({
    username: "",
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
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = value;
    });

    console.log(data);
    await fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        accept: "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
  }

  // const postData = async (entity) => {
  //   await fetch(`http://localhost:3001/createAcc`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: { entity },
  //   }).then((resp) => resp.json());
  // };

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-[url('/galaxy.png')] bg-cover bg-no-repeat pb-20 pt-20">
      <form className="flex w-[70vw] flex-col gap-5 bg-random-grey p-8 lg:h-[70vh] lg:w-[45vw]">
        <h1 className="text-center text-3xl font-bold capitalize text-black">
          Sign Up
        </h1>
        <div className="">
          <label htmlFor="username" className="text-xl font-bold">
            Username :
          </label>
          <input
            onChange={handleInput}
            type="text"
            id="username"
            name="username"
            className="h-8 w-full border border-black text-black"
          ></input>
        </div>
        <div className="">
          <label htmlFor="email" className="text-xl font-bold">
            E-mail :
          </label>
          <input
            onChange={handleInput}
            type="email"
            name="email"
            id="email"
            className="h-8 w-full border border-black text-black"
          ></input>
        </div>
        <div>
          <label htmlFor="password" className="text-xl font-bold">
            Password :
          </label>
          <input
            onChange={handleInput}
            type="password"
            name="password"
            id="password"
            className="h-8 w-full border border-black text-black"
          ></input>
        </div>
        <div className="mb-6 mt-2 flex grow flex-col justify-evenly">
          <button
            type="submit"
            onSubmit={submitForm}
            className="w-full max-w-[200px] self-center rounded-full bg-black px-12 py-2 text-center text-xl font-black capitalize text-white duration-300 hover:bg-slate-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p onClick={submitForm}>gjhgjhgjhgjgjgjhgjhgjhg</p>
    </div>
  );
}
