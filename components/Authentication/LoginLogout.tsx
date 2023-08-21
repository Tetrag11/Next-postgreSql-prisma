"use client";
import { signOut, signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function LoginLogout({ session }: any) {
  if (session?.user) {
    return (
      <div className="flex gap-3 items-center">
        <Link className="text-lg" href={"/dashboard"}>
          Dashboard
        </Link>
        <button
          onClick={() => {
            signOut();
          }}
          className="text-lg"
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <button
        onClick={() => {
          signIn();
        }}
        className="text-lg"
      >
        Sign In
      </button>
    );
  }
}
