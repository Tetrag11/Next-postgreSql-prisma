import UploadButtonTemplate from "@/components/CloudStorage/UploadButtonTemplate";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-3">
      <h1>dashboard</h1>

      <Link href={"/dashboard/newpost"} className="py-2 px-3 bg-blue-500 w-fit">
        Create Post
      </Link>
    </div>
  );
}
