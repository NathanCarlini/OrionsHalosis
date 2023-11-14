import Link from "next/link";
import Image from "next/image";


export default async function () {
  const res = await fetch("http://localhost:8080/checkIfSession&Data", {
    method: "GET",
    next: { tags: ["a"] },
  });
  const json = await res.json();
  
  return (
    <>
      {json == false ? (
        <div className="flex flex-row gap-3">
          <Link href="/signup">
            <div className=" rounded-full bg-black px-2 py-1 text-white duration-500 hover:bg-slate-500 md:px-8 md:py-2">
              Sign up
            </div>
          </Link>
          <Link href="/login">
            <div className=" rounded-full bg-white px-2 py-1 text-black duration-500 hover:bg-slate-500 hover:text-white md:px-8 md:py-2">
              Log In
            </div>
          </Link>
        </div>
      ) : (
        <Link href="/account">
          <Image src={json.avatar} alt="test" width={40} height={40} />
        </Link>
      )}
    </>
  );
}
