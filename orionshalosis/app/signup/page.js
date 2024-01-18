"use client";
// import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Page() {
  var data = {};
  const date = new Date();
  let verif;
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "defaultuser.png",
    creationdate: date,
    experience: 0,
  });
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function checkPwd (){
    let p = document.getElementById("rePassword")
    let d = document.getElementById("sendBtn")
    if ((p.value) != formData.password
    ) {
      p.classList.add("bg-red-400")
      d.onclick = async () => {
        //submitForm();
        //await sleep(3000);
        //router.push("/");
      }
    } else if ((p.value) == formData.password
    
    ) {
      p.classList.remove("bg-red-400")
      d.onclick = async () => {
        submitForm();
        await sleep(3000);
        router.push("/");
      }
    }
  };

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
    } else if (e.target.id == "rePassword"){
      checkPwd()
    }
  };

  
  // test
  async function submitForm() {
    setLoading(true);
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = value;
    });
    const res = await fetch(`/api/createUsr`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    // console.log(await res.json());
    let { token } = await res.json();
    console.log(token);
    document.cookie = `token=${token}; path=/`;
    setLoading(false);
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
            // onBlur={checkPwd}
            // onFocus={checkPwd}
            type="password"
            name="rePassword"
            id="rePassword"
            className="h-12 w-full border-0 bg-random-grey text-black focus:outline-black"
          />
        </div>

        <div className="mt-2 flex grow flex-col justify-evenly">
          {verif ? <p>{verif}</p> : ""}
          <p
            id="sendBtn"
            // onClick={
            //   async () => {
            //   submitForm();
            //   await sleep(3000);
            //   router.push("/");
            // }}
            className="w-full max-w-[200px] cursor-pointer self-center rounded-full bg-black px-12 py-5 text-center text-xl font-black capitalize text-white duration-300 hover:bg-slate-500"
          >
            Sign Up
          </p>
        </div>
      </form>
    </div>
  );
}
