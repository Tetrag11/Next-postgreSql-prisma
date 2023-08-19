"use client";
import { signOut, signIn } from "next-auth/react";
import React from "react";

export default function LoginLogout({ session }: any) {
  if (session?.user) {
    return (
      <button
        onClick={() => {
          signOut();
        }}
        className="text-lg"
      >
        Logout
      </button>
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
