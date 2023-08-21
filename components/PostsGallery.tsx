"use client";
import { deleteAllPosts, deletePost, getPosts } from "@/app/actions";
import React from "react";

export default function PostsGallery({ posts, userEmail }: any) {
  if (posts) {
    return (
      <div>
        <button
          className="py-2 px-3 bg-red-700 w-fit"
          onClick={() => {
            deleteAllPosts(userEmail);
          }}
        >
          Delete all Posts
        </button>
        <div className="gallery grid grid-cols-3 max-w-screen-xl mx-auto">
          {posts.posts.map((post: any) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button
                onClick={() => {
                  deletePost(post.id);
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
