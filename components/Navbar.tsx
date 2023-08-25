import Link from "next/link";
import React, { useContext } from "react";
import LoginLogout from "./Authentication/LoginLogout";
import { useSession } from "next-auth/react";
import AnimationContext from "./WaltDisney/AnimationContext";
import { animated } from "@react-spring/web";

export default function Navbar() {
  const { data: session } = useSession();
  const context = useContext(AnimationContext) as any;
  const foreground = context.foregroundAnimation;

  return (
    <animated.div
      style={foreground}
      className="flex w-full justify-between items-center   py-4 px-10 shadow-lg  mb-[2px] border-b-[1px] bg-white z-50 "
    >
      <Link href={"/"} className="text-lg">
        <animated.h1 style={foreground} className="font-semibold">
          Social<span className="pl-1 text-3xl font-bold">X</span>
        </animated.h1>
      </Link>
      <ul className="flex gap-3">
        <li>
          {!session?.user && (
            <Link href={"/register"}>
              <animated.span style={foreground} className="text-lg">
                Sign Up
              </animated.span>
            </Link>
          )}
        </li>

        <li>
          <LoginLogout session={session} />
        </li>
      </ul>
    </animated.div>
  );
}
