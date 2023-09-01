"use client";
import React from "react";
import Image from "next/image";
import { deletePost } from "@/app/actions";

export default function Card({ post }: any) {
  return (
    <div
      style={{ gridTemplateRows: "300px auto" }}
      className="card w-full max-w-[320px] h-full  border-2 border-black grid p-3 gap-3"
    >
      {post.media.map((media: any) => (
        <Image
          key={media.id}
          src={media.url}
          alt={media.key}
          width={300}
          height={300}
          className="object-cover w-full h-full max-w-[300px] max-h-[300px]"
        ></Image>
      ))}

      <div className="w-full h-full flex items-center">
        <p
          className="w-full  font-semibold "
          style={{ display: "grid", gridTemplateRows: "subgrid" }}
        >
          {post.content}
        </p>
      </div>
      <button
        onClick={async () => {
          await deletePost(post.id);
          window.location.reload();
        }}
        className="py-2 px-3 border border-black w-fit h-fit self-end"
      >
        Delete Post
      </button>
    </div>
  );
}
