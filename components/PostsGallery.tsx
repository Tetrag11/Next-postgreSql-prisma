"use client";
import { deletePost, getPosts } from "@/app/actions";
import { useRouter } from "next/navigation";
import React from "react";

export default function PostsGallery({ posts, userEmail }: any) {
  const router = useRouter();
  if (posts) {
    return (
      <div>
        <div className="gallery grid grid-cols-3 max-w-screen-xl mx-auto">
          {posts.posts.map((post: any) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button
                onClick={async () => {
                  await deletePost(post.id);
                  window.location.reload();
                }}
                className="py-2 px-3 bg-red-500 w-fit"
              >
                Delete Post
              </button>
              <ul className="">
                {post.media.map((media: any) => (
                  <li key={media.id}>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      src={media.url}
                      alt={media.key}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
