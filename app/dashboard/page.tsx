import UploadButtonTemplate from "@/components/CloudStorage/UploadButtonTemplate";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import prisma from "@/prisma";
import PostsGallery from "@/components/PostsGallery";
import { deletePost, displayAvatar, getPosts } from "../actions";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import AvatarUpload from "@/components/AvatarUpload";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard/Dashboard";
import { useRouter } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let posts = await getPosts(userEmail);

  let avatar = (await displayAvatar(userEmail)) as any;

  return (
    <>
      <Navbar />
      <Dashboard
        deletePost={deletePost}
        currentAvatar={avatar && avatar.fileUrl ? avatar.fileUrl : null}
        posts={posts}
        userEmail={userEmail}
      />
      <Footer />
    </>
  );
}

{
  /* <h1>dashboard</h1>

<Link href={"/dashboard/newpost"} className="py-2 px-3 bg-blue-500 w-fit">
  Create Post
</Link>
<AvatarUpload
  currentAvatar={avatar && avatar.fileUrl ? avatar.fileUrl : null}
/>
{userEmail && (
  <PostsGallery
    userEmail={userEmail}
    posts={posts}
    deletePost={deletePost}
  />
)} */
}
