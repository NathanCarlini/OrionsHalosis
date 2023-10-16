import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex h-[90vh] w-screen flex-row items-end justify-center">
        <video
          autoPlay
          muted
          loop
          className="fixed z-[-1] h-full w-full object-cover"
        >
          <source src="" type="video/mp4" />
        </video>
        <Link href="/game/inscription">
          <div className="mb-6 bg-main-blue p-2 text-2xl font-bold text-white">
            Play for free
          </div>
        </Link>
      </section>
      <section className="bg-random-grey pb-88 px-84 flex flex-col ">
        <p className="my-10 text-3xl font-black text-black">
          How does the game work ?
        </p>
        <div className="flex max-h-[400px] w-full flex-row justify-evenly gap-3">
          <div className="aspect-square max-h-[400px] bg-[url('/mars.png')] bg-cover bg-no-repeat p-2 text-3xl font-black text-white">
            Capture planets to get resources
          </div>
          <div className="aspect-square max-h-[400px] bg-black bg-cover bg-no-repeat p-2 text-3xl font-black text-white">
            Use cards to damage your opponent
          </div>
          <div className="aspect-square max-h-[400px] bg-[url('/Planetary_System.png')] bg-cover bg-no-repeat p-2 text-3xl font-black text-white">
            First to capture the whole planetary system wins !
          </div>
        </div>
      </section>
      <section className="px-84 w-full bg-darkdark-blue">
        <p className="my-10 text-3xl font-black text-white">
          Look at the data 👀
        </p>
        <div className="flex w-full flex-row items-center justify-between">
          {/* divs for graphs  */}
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="mb-6 max-w-fit bg-main-blue p-2 text-2xl font-bold text-white">
          See more data
        </div>
      </section>
    </>
  );
}
