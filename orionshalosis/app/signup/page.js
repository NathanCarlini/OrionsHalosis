export default function Page() {

  return (
    <div className="flex pt-20 pb-20 h-full w-full absolute flex-col items-center justify-center bg-[url('/galaxy.png')] bg-cover bg-no-repeat">
      <section className="bg-random-grey flex flex-col gap-5 p-8 w-[70vw] lg:h-[70vh] lg:w-[45vw]">
        <h1 className="text-center text-3xl font-bold capitalize text-black">
          Sign Up
        </h1>
        <div className="">
          <p className="text-xl font-bold">Username :</p>
          <input  type="text" id="Username" className="h-8 w-full border border-black text-black"></input>
        </div>
        <div className="">
          <p className="text-xl font-bold">E-mail :</p>
          <input  type="text" id="Email" className="h-8 w-full border border-black text-black"></input>
        </div>
        <div>
          <p className="text-xl font-bold">Password :</p>
          <input type="password" id="Password" className="h-8 w-full border border-black text-black"></input>
        </div>
        <div className="mb-6 mt-2 flex grow flex-col justify-evenly">
          <a className="max-w-fit self-center rounded-full bg-black px-16 py-2 text-xl font-black capitalize text-white">
            Sign Up
          </a>
        </div>
      </section>
    </div>
  );
}
