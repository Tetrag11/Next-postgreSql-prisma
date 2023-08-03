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
      >
        Sign In
      </button>
    );
  }
}
