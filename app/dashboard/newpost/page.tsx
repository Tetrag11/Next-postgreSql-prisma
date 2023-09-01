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
  const router = useRouter();
  if (reload) {
    router.push("/dashboard?revalidate=true");
  }

  const [msg, setMsg] = useState<any>("");
  const { data: session } = useSession();
  const email = session?.user?.email;

  async function createPostClient(urls: any) {
    const tempmsg = (await createPost(content, title, urls, email)) as any;
    setReload(tempmsg);
  }

  return (
    <div className="w-full h-full py-10">
      <form className="flex flex-col gap-5 py-5 px-5 max-w-[500px] mx-auto w-full border-2 border-black rounded-sm">
        {msg && <h1 className="text-center">{msg}</h1>}
        <textarea
          name="content"
          cols={30}
          rows={5}
          placeholder="Content"
          className="text-black placeholder:text-black border border-black p-3 focus:bg-black focus:placeholder:text-white focus:text-white"
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
      </form>
    </div>
  );
}
