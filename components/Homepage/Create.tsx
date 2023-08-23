"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useSpring, animated } from "@react-spring/web";
import AnimationContext from "../WaltDisney/AnimationContext";

export default function Create({ setX, calculateBackgroundColor }: any) {
  const context = useContext(AnimationContext) as any;
  const foreground = context.foregroundAnimation;
  const [mousePos, setMousePos] = useState({}) as any;
  const container = useRef(null) as any;

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePos({ x: event.clientX });
      context.setX(event.clientX);
    };

    container.current &&
      container.current.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.current &&
        container.current.addEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Create a spring animation for the background color change

  return (
    <animated.div className="w-full h-full pt-28 " ref={container}>
      {/* made a relative wrapper, and inside it, has a relative child, which results in the parent taking the relative childs height, and then pushes the relative child down by margin-top, doing this will fix all of your height problems when dealing with absolute positions, and the parent only takes the required space  */}
      <div className="wrapper sm:max-w-[735px] max-w-[300px]  w-full mx-auto relative overflow-hidden">
        <animated.div
          style={foreground}
          className="absolute sm:w-[300px] w-[200px] sm:h-[400px] h-[300px] border-2 border-black top-0 "
        ></animated.div>
        <animated.div
          style={foreground}
          className="relative sm:w-[300px] w-[200px]  sm:h-[400px] h-[300px] border-2 border-black mt-[20%] sm:left-[16rem] left-[10rem] translate-x-[-50%] scale-[80%] "
        ></animated.div>
        <div className="absolute w-full h-full sm:top-[55%] top-[100%] translate-y-[-50%] sm:left-[45%] left-[30%]">
          <div className="w-full h-full flex flex-col">
            <animated.h3 style={foreground} className="sm:text-7xl text-2xl">
              Share,
            </animated.h3>
            <animated.h2 style={foreground} className="sm:text-8xl text-3xl">
              Explore,
            </animated.h2>
            <animated.h1 style={foreground} className="sm:text-9xl text-4xl">
              Create,
            </animated.h1>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
