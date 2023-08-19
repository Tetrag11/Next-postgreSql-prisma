"use client";
import React, { useState } from "react";
import { OurFileRouter } from "../../app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { UploadDropzone } from "@uploadthing/react";

export default function UploadButtonTemplate() {
  const [url, setUrl] = useState<any>([]);
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <UploadDropzone<OurFileRouter>
        endpoint="imageUploader"
        onUploadProgress={() => {
          console.log("leg");
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setUrl(res);
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
  );
}
