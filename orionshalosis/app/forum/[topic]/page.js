"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
export default function Page() {
  var datoi = {};
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [dataa, setData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "",
  });
  let Name = window.location.pathname
  Name = Name.slice(7)

  useEffect(() => {
console.log(Name);
    // router.reload()
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login"); // If no token is found, redirect to login page
      return;
    }
    const validateToken = async () => {
      try {
        const res = await fetch(`/api/getData`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        let body = await res.json();
        setData(body);
        setLoading(false);
        if (!res.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    validateToken();

    const getPost = async () => {
      try {
        const post = await fetch(`/api/forum/`, {
          method: "PUT",
          body: JSON.stringify({ topicname: Name }),
        });
        let postBody = await post.json();
        setPostData(postBody);
        setLoading(false);
        if (!post.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    getPost();
  }, [router]);

  const handleInput = (e) => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
      userId: dataa.data.iduser,
    }));
    Object.entries(formData).forEach(([key, value]) => {
      datoi[key] = value;
    });
    // setFormData({ userId: dataa.data.iduser });
  };
  async function submitForm() {
    Object.entries(formData).forEach(([key, value]) => {
      datoi[key] = value;
    });
    try {
      const res = await fetch(`/api/forum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (!postData) return <p>No profile data</p>;

  return (
    <div className="absolute flex h-full w-full flex-col bg-[url('/backgrounds/blue-bg.jpg')] p-6">
      <h1 className="mb-12 w-full text-center font-sans text-4xl font-bold capitalize">
        {Name}{" "}
      </h1>
      <div className="grid h-full w-full grid-cols-3 gap-3">
        {/* ici profil */}
        <div className="flex w-fit flex-row justify-between rounded-l-xl  p-4">
          <div className="flex flex-row gap-5">
            <div className="relative aspect-square h-24 w-40 bg-slate-400/40  md:h-40">
              <Image
                src={"/" + dataa.data.avatar}
                layout="fill"
                objectFit="cover"
                alt="user avatar"
              ></Image>
            </div>
            <div className="flex h-full flex-col gap-4">
              <p className="text- w-fit bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
                {dataa.data.username}
              </p>
              <p className="bg-slate-400/40 px-2 py-1 font-black text-white md:text-xl">
                Beginner space Explorer lvl.5
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-gray-500 bg-opacity-50 p-3">
          {postData ? postData.map((post) => (
            <div key={post.idpost} className="hover: flex flex-col border border-gray-700 p-3">
              <p className="text-xl font-bold text-white">{post.title}</p>
              <p className="text-lg text-white">{post.content}</p>
              <p className="text-sm text-white">{post.datepost}</p>
            </div>
          )) : <p className="text-white text-xl">No Posts Yet on this category</p>}
        </div>
        <div className="flex w-full flex-col gap-8 rounded-xl bg-gray-500 bg-opacity-50 p-3">
          <p className="text-center text-2xl font-bold text-white">
            Post content
          </p>
          <form
            className="flex w-full flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              onChange={handleInput}
              id="title"
              placeholder="Title of your post"
              className="h-10 w-full rounded-xl bg-gray-500 bg-opacity-30"
            />
            <input
              type="text"
              onChange={handleInput}
              id="content"
              placeholder="Content"
              className="h-32 w-full rounded-xl  bg-gray-500 bg-opacity-30"
            />
            <p
              className="cursor-pointer"
              onClick={() => {
                submitForm();
              }}
            >
              Add Post
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
