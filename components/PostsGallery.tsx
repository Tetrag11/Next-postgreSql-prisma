"use client";
import { deletePost, getPosts } from "@/app/actions";
import { useRouter } from "next/navigation";
import React from "react";
import Card from "./Dashboard/Card";

export default function PostsGallery({ posts }: any) {
  console.log(posts.posts.length > 0);
  if (posts.posts && posts.posts.length > 0) {
    return (
      <div>
        <div className="w-full flex flex-wrap justify-center sm:justify-start gap-10  pt-20 mx-auto">
          {posts.posts.map((post: any, index: any) => (
            <Card key={index} post={post} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h3 className="text-lg py-10">No Posts created yet</h3>
      </div>
    );
  }
}
