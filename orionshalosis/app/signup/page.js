import Link from "next/link";
export default function Page() {

  return (
    <div className="flex pt-20 pb-20 h-full w-full absolute flex-col items-center justify-center bg-[url('/galaxy.png')] bg-cover bg-no-repeat">
      <form className="bg-random-grey flex flex-col gap-5 p-8 w-[70vw] lg:h-[70vh] lg:w-[45vw]">
        <h1 className="text-center text-3xl font-bold capitalize text-black">
          Sign Up
        </h1>
        <div className="">
          <label className="text-xl font-bold">Username :</label>
          <input  type="text" id="Username" className="h-8 w-full border border-black text-black"></input>
        </div>
        <div className="">
          <label className="text-xl font-bold">E-mail :</label>
          <input  type="email" id="Email" className="h-8 w-full border border-black text-black"></input>
        </div>
        <div>
          <label className="text-xl font-bold">Password :</label>
          <input type="password" id="Password" className="h-8 w-full border border-black text-black"></input>
        </div>
        <div className="mb-6 mt-2 flex grow flex-col justify-evenly">
          <button type="submit" action="http://localhost:3001/createAcc" className="max-w-[200px] w-full text-center self-center rounded-full bg-black px-12 py-2 text-xl font-black capitalize text-white duration-300 hover:bg-slate-500">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
