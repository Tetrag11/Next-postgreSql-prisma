"use client";
import { avatarUpload } from "@/app/actions";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    <div className="flex gap-3">
      {avatar !== null ? (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "50px", height: "50px" }}
        />
      ) : null}
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
  );
}
