"use client";
import React from "react";
import { createContext, useContext, useState } from "react";
import AnimationContext from "./AnimationContext";
import { useSpring } from "@react-spring/web";

export default function AnimationController({ children }: any) {
  const [x, setX] = useState(false);
  const [background, setBackground] = useState({});

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

  const backgroundAnimation = useSpring({
    backgroundColor: calculateBackgroundColor(x, true), // Initial position
    config: { tension: 200, friction: 20 },
  });

  const foregroundAnimation = useSpring({
    color: calculateBackgroundColor(x, false),
    borderColor: calculateBackgroundColor(x, false),
    config: { tension: 200, friction: 20 },
  });

  return (
    <AnimationContext.Provider
      value={{ x, setX, backgroundAnimation, foregroundAnimation }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
