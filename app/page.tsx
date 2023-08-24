"use client";

import Create from "@/components/Homepage/Create";
import Introduction from "@/components/Homepage/Introduction";
import AnimationContext from "@/components/WaltDisney/AnimationContext";
import { useSpring, animated } from "@react-spring/web";
import { useState, useContext } from "react";

export default function Home() {
  const calculateBackgroundColor = (xPosition: any, background: boolean) => {
    if (background) {
      if (xPosition <= window.innerWidth / 2) {
        return "white";
      } else {
        return "black";
      }
    } else {
      if (xPosition >= window.innerWidth / 2) {
        return "white";
      } else {
        return "black";
      }
    }
  };

  return (
    <animated.div className="w-full h-full relative flex flex-col sm:gap-36 gap-20 justify-around">
      <Create />
      <Introduction />
      <div>Next Section</div>
    </animated.div>
  );
}
