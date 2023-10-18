export default function Page() {

  return (
    <div className="flex h-full overflow-hidden flex-col items-center justify-center bg-[url('/galaxy.png')] bg-cover bg-no-repeat">
      <section className="bg-random-grey flex flex-col gap-5 p-8 lg:h-[70vh] lg:w-[45vw]">
        <h1 className="text-center text-3xl font-bold capitalize text-black">
          Sign Up
        </h1>
        <div className="">
          <p className="text-3xl font-bold">Username :</p>
          <input  type="text" id="Username" className="h-10 w-full text-black"></input>
        </div>
        <div className="">
          <p className="text-3xl font-bold">E-mail :</p>
          <input  type="text" id="Email" className="h-10 w-full text-black"></input>
        </div>
        <div>
          <p className="text-3xl font-bold">Password :</p>
          <input type="password" id="Password" className="h-10 w-full text-black"></input>
        </div>
        <div className="mb-6 mt-2 flex grow flex-col justify-evenly">
          <div className="max-w-fit self-center rounded-full bg-black px-16 py-2 text-xl font-black capitalize text-white">
            Sign Up
          </div>
        </div>
      </section>
    </div>
  );
}
