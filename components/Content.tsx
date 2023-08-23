"use client";
import React, { useContext } from "react";
import Navbar from "./Navbar";
import AnimationContext from "./WaltDisney/AnimationContext";
import { animated } from "@react-spring/web";
import StarterAnimation from "./StarterAnimation";

export default function Content({ children, session }: any) {
  const context = useContext(AnimationContext) as any;
  const background = context.backgroundAnimation;
  return (
    <animated.div style={background} className="w-full h-full relative">
      <StarterAnimation />
      <div className="relative top-0 left-0 w-full h-full  ">
        <Navbar />
        {children}
      </div>
    </animated.div>
  );
}
