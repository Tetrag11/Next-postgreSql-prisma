"use client";
import UploadButtonTemplate from "@/components/CloudStorage/UploadButtonTemplate";
import React, { useState } from "react";
import { OurFileRouter } from "../../../app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { createPost } from "@/app/actions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";
import Email from "next-auth/providers/email";
import { Result } from "postcss";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Page() {
  const [url, setUrl] = useState<any>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [reload, setReload] = useState(false);
  if (reload) {
    const router = useRouter();
    router.push("/dashboard");
  }

  const [msg, setMsg] = useState<any>("");
  const { data: session } = useSession();
  const email = session?.user?.email;

  async function createPostClient(urls: any) {
    const tempmsg = (await createPost(content, title, urls, email)) as any;
    setReload(tempmsg);
  }

  return (
    <div>
      <h1>Create New Post</h1>
      <form className="max-w-lg mx-auto flex flex-col gap-3 mt-20">
        <input
          type="text"
          placeholder="Enter Title"
          className="text-black placeholder:text-black"
          value={title}
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}
          required
        />
        <textarea
          name="content"
          cols={30}
          rows={5}
          placeholder="Content"
          className="text-black placeholder:text-black"
          value={content}
          onChange={(e: any) => {
            setContent(e.target.value);
          }}
          required
        ></textarea>
        <main className="flex  flex-col items-center justify-between p-24">
          <UploadDropzone<OurFileRouter>
            endpoint="imageUploader"
            onUploadProgress={() => {
              console.log("hello");
            }}
            onClientUploadComplete={(res) => {
              // Do something with the response

              createPostClient(res);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <ul className="flex flex-col gap-3">
            {url.length
              ? url.map((image: any) => (
                  <li key={image.fileKey}>{image.fileUrl}</li>
                ))
              : null}
          </ul>
        </main>
        <h1>{msg}</h1>
      </form>
    </div>
  );
}
