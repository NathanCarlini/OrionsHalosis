import Link from "next/link";
export default function Page() {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-[url('/galaxy.png')] bg-cover bg-no-repeat pb-20 pt-20">
      <section className="flex w-[70vw] flex-col gap-5 bg-random-grey p-8 lg:h-[70vh] lg:w-[45vw]">
        <h1 className="text-center text-3xl font-bold capitalize text-black">
          Log In
        </h1>
        <div className="">
          <p className="text-xl font-bold">Username :</p>
          <input
            type="text"
            id="Username"
            className="h-8 w-full border border-black text-black"
          ></input>
        </div>
        <div>
          <p className="text-xl font-bold">Password :</p>
          <input
            type="password"
            id="Password"
            className="h-8 w-full border border-black text-black"
          ></input>
          <p className="text-blue-700">You forgot your password ?</p>
        </div>
        <div className="mb-6 mt-2 flex grow flex-col justify-evenly">
          <Link
            href="/"
            className="mb-4 w-full max-w-[175px] self-center rounded-full bg-white px-12 py-2 text-center text-xl font-black capitalize text-black duration-300 hover:bg-slate-500"
          >
            Log In
          </Link>
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
