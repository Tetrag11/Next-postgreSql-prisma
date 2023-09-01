"use client";
import { avatarUpload } from "@/app/actions";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";

export default function AvatarUpload({ currentAvatar }: any) {
  const [avatar, setAvatar] = useState(currentAvatar);

  const { data: session } = useSession();

  const email = session?.user?.email;
  async function handleAvatar(email: any, avatar: any) {
    avatar.map(async (a: any) => {
      let status = (await avatarUpload(email, a)) as any;
      setAvatar(status.fileUrl);
    });
  }

  return (
    <div className="flex gap-3 avatar-upload">
      {avatar !== null ? (
        <Image
          height={120}
          width={120}
          className="my-auto self-center sm:max-h[120px] max-h-[80px] max-w-[80px] object-cover object-center"
          src={avatar}
          alt="avatar"
          style={{
            width: "100%",
            height: "100%",

            aspectRatio: "1/1",
          }}
        />
      ) : null}

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">{session?.user?.name}</h1>
        <h2 className="text-xl opacity-80">{session?.user?.email}</h2>
        <div className="upload-thing">
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              if (res && res.length == 1) {
                handleAvatar(email, res);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
