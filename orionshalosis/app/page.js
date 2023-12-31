import Image from "next/image";
import Link from "next/link";
import prisma from '../lib/prisma';
import Footer from "./Footer";
export default function Home() {
  return (
    <>
      <section className="flex h-[95vh] w-full flex-row items-end justify-center">
        <video
          autoPlay
          muted
          loop
          disablePictureInPicture
          className="absolute top z-[1] h-full w-full object-cover"
        >
          <source src="/mars101.mp4" type="video/mp4" />
        </video>
        <Link href="/game/inscription">
          <div className="mb-28 bg-main-blue z-[2] relative p-4 rounded-3xl text-lg md:text-xl lg:text-2xl font-bold text-white duration-500 hover:text-main-blue hover:bg-white">
            Play for free
          </div>
        </Link>
      </section>
      <section className="bg-random-grey pb-88 px-8 md:px-84 flex flex-col ">
        <p className="my-10 text-xl md:text-2xl lg:text-3xl font-black text-black">
          How does the game work ?
        </p>
        <div className="flex max-h-[400px] w-full flex-row justify-evenly gap-3">
          <div className="aspect-square max-h-[400px] bg-[url('/backgrounds/mars.png')] bg-cover bg-no-repeat p-2 text-base md:text-xl lg:text-2xl font-medium text-white">
            Capture planets to get resources
          </div>
          <div className="aspect-square max-h-[400px] bg-black bg-cover bg-no-repeat p-2 text-base md:text-xl lg:text-2xl font-medium text-white">
            Use cards to damage your opponent
          </div>
          <div className="aspect-square max-h-[400px] bg-[url('/Planetary_System.png')] bg-cover bg-no-repeat p-2 text-base md:text-xl lg:text-2xl font-medium text-white">
            First to capture the whole planetary system wins !
          </div>
        </div>
      </section>
      <section className="px-84 w-full bg-darkdark-blue pb-10">
        <p className="pt-10 pb-5 text-xl md:text-2xl lg:text-3xl  font-black text-white">
          Look at the data 👀
        </p>
        <div className="flex w-full flex-row items-center justify-between">
          {/* divs for graphs  */}
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link href="/stats" className="max-w-fit bg-main-blue p-2 text-lg md:text-xl lg:text-2xl font-bold text-white">
          See more data
        </Link>
      </section>
      <Footer vis="1" />
    </>
  );
}
