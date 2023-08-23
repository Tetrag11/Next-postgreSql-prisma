"use client";
import { signOut, signIn } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import AnimationContext from "../WaltDisney/AnimationContext";
import { animated } from "@react-spring/web";

export default function LoginLogout({ session }: any) {
  const context = useContext(AnimationContext) as any;
  const foreground = context.foregroundAnimation;
  if (session?.user) {
    return (
      <div className="flex gap-3 items-center">
        <Link className="text-lg" href={"/explore"}>
          <animated.span style={foreground} className="lext-lg">
            Explore
          </animated.span>
        </Link>
        <Link className="text-lg" href={"/dashboard"}>
          <animated.span style={foreground} className="lext-lg">
            Dashboard
          </animated.span>
        </Link>
        <button
          onClick={() => {
            signOut();
          }}
          className="text-lg"
        >
          <animated.span style={foreground} className="lext-lg">
            Logout
          </animated.span>
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
