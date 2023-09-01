"use client";
import React, { useEffect } from "react";
import AvatarUpload from "../AvatarUpload";
import Image from "next/image";
import Card from "./Card";
import Link from "next/link";
import PostsGallery from "../PostsGallery";
import { useRouter } from "next/navigation";

export default function Dashboard({
  currentAvatar,
  deletePost,
  posts,
  userEmail,
}: any) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [posts]);

  return (
    <div className="w-full h-full relative flex flex-col mt-10 px-10">
      <div className="w-full">
        <h1 className="sm:text-8xl text-4xl ml-auto w-fit">DashBoard</h1>
      </div>
      <div className="w-full">
        <article className="flex flex-col sm:flex-row gap-2 justify-between">
          <AvatarUpload currentAvatar={currentAvatar} />
          <Link
            href={"/dashboard/newpost"}
            className="py-2 px-3 h-fit w-fit border border-black font-semibold sm:self-end self-center"
          >
            Create Post
          </Link>
        </article>
      </div>
      <div className="w-full h-full">
        <PostsGallery posts={posts} />
      </div>
    </div>
  );
}
