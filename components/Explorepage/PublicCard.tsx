"use client";
import React from "react";
import Image from "next/image";

export default function PublicCard({ post }: any) {
  return (
    <div className="card w-full sm:max-w-[520px] sm:h-full sm:grid-rows-[500px_auto] grid-rows-[300px_auto]  grid p-3 gap-3">
      {post.media.map((media: any) => (
        <Image
          key={media.id}
          src={media.url}
          alt={media.key}
          width={500}
          height={500}
          className="object-cover sm:w-[500px] sm:h-[500px] w-[300px] h-[300px] "
        ></Image>
      ))}

      <div className="w-full h-full flex items-center">
        <p
          className="w-full  font-semibold max-w-[300px] sm:max-w-none"
          style={{ display: "grid", gridTemplateRows: "subgrid" }}
        >
          {post.content}
        </p>
      </div>
    </div>
  );
}
