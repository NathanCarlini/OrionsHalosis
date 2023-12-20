"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Page() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(
          `/api/getData`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        let body = await res.json();
        setData(body);
        setLoading(false);
        if (!res.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
  }, [router]);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>

      <div>
        <h3>Add a Comment</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = e.target.content.value;
            addComment(content);
            e.target.content.value = "";
          }}
        >
          <textarea name="content" rows={4} required />
          <br />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
}

export default index;
