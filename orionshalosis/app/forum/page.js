import Link from "next/link";

function page() {
  return (
    <div className="absolute flex min-h-full w-full justify-evenly flex-col items-center bg-[url('/backgrounds/blue-bg.jpg')] bg-cover">
      <div className="flex flex-col items-center gap-5 my-12">
        <h1 className="text-center text-8xl font-black text-white">
          Welcome to the Forum
        </h1>
        <p className="text-center text-2xl text-white mt-3">
          Here you can interact with the community, meme, ask questions and get <br/>
          answers about life and everything (okay maybe not this)
        </p>
      </div>
      <div>
        <Link href="/forum/main">
          <button className="rounded-xl bg-marine-blue px-12 py-3 text-white text-3xl hover:bg-marine-blue-sec">
            Access
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
