import Link from "next/link";

export default function page() {
  return (
    <div className="absolute flex min-h-full w-full flex-col items-center justify-evenly bg-[url('/backgrounds/blue-bg.jpg')] bg-cover">
      <div className="my-12 flex flex-col items-center gap-5">
        <h1 className="text-center text-8xl font-black text-white">
          Welcome to the Forum
        </h1>
        <p className="mt-3 text-center text-2xl text-white">
          Here you can interact with the community, meme, ask questions and get{" "}
          <br />
          answers about life and everything (okay maybe not this)
        </p>
      </div>
      <div className="flex flex-row justify-evenly gap-8">
        <Link href="/forum/meme">
          <button className="rounded-xl bg-marine-blue px-12 py-3 text-3xl text-white duration-500 hover:bg-marine-blue-sec">
            Memes and stuff
          </button>
        </Link>
        <Link href="/forum/Q&A">
          <button className="rounded-xl bg-marine-blue px-12 py-3 text-3xl text-white duration-500 hover:bg-marine-blue-sec">
            Q&A Forum
          </button>
        </Link>
        <Link href="/forum/bugcatchers">
          <button className="rounded-xl bg-marine-blue px-12 py-3 text-3xl text-white duration-500 hover:bg-marine-blue-sec">
            Bugcatchers Forum
          </button>
        </Link>
      </div>
    </div>
  );
}
