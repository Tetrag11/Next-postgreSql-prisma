import UploadButtonTemplate from "@/components/CloudStorage/UploadButtonTemplate";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import prisma from "@/prisma";
import PostsGallery from "@/components/PostsGallery";
import { deletePost, getPosts } from "../actions";

export default async function page() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let posts = await getPosts(userEmail);

  return (
    <div className="flex flex-col gap-3">
      <h1>dashboard</h1>

      <Link href={"/dashboard/newpost"} className="py-2 px-3 bg-blue-500 w-fit">
        Create Post
      </Link>

      {userEmail && (
        <PostsGallery
          userEmail={userEmail}
          posts={posts}
          deletePost={deletePost}
        />
      )}
    </div>
  );
}
