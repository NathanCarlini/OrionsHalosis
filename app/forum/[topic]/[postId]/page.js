"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { postId } = router.query;
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState(null);
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    console.log({ postId });
    const getPost = async () => {
      try {
        const post = await fetch(
          `/api/forum/post`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const comment = await fetch(
          `/api/forum/${postId}/comments`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        let postBody = await post.json();
        let commentBody = await comment.json();
        setPostData(postBody);
        setCommentData(commentBody);
        setLoading(false);
        if (!res.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/login"); // Redirect to login if token validation fails
      }
    };
    getPost();
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
            e.target.content.value = '';
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