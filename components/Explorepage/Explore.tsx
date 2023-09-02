"use client";
import React from "react";
import PublicCard from "./PublicCard";
import Image from "next/image";

export default function Explore({ posts }: any) {
  return (
    <div className=" px-10 flex flex-col lg:gap-52 pt-52 gap-32">
      {posts.map((post: any, index: any) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-3 justify-center items-center w-full md:flex-row flex-col explore-card "
        >
          <div className="flex gap-3 justify-self-end justify-center items-center md:order-1 order-2 ">
            <PublicCard post={post} />
          </div>
          <article className="md:order-2 order-1">
            <div className="flex gap-3 avatar-upload flex-col sm:flex-row">
              {post.author.avatar !== null ? (
                <Image
                  height={120}
                  width={120}
                  className="my-auto sm:self-center self-start sm:max-h[120px] max-h-[80px] max-w-[80px] object-cover object-center"
                  src={post.author.avatar.fileUrl}
                  alt="avatar"
                  priority={true}
                  style={{
                    width: "100%",
                    height: "100%",

                    aspectRatio: "1/1",
                  }}
                />
              ) : null}

              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-2xl">{post.author.name}</h1>
                <h2 className="text-xl opacity-80">{post.authorEmail}</h2>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
