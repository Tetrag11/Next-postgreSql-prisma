"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import AnimationContext from "./WaltDisney/AnimationContext";
import { useTransition, animated } from "@react-spring/web";
import StarterAnimation from "./StarterAnimation";
import Footer from "./Footer";

export default function Content({ children, session }: any) {
  const context = useContext(AnimationContext) as any;
  const background = context.backgroundAnimation;

  const [timer, setTimer] = useState(true);

  const killAnimation = useTransition(timer, {
    to: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(false);
    }, 2000);
  }, []);
  return (
    // <animated.div style={background} className="w-full h-full relative">
    //   {killAnimation((style, item) =>
    //     item ? (
    //       <animated.div
    //         className="w-full h-screen absolute top-0 left-0 bg-black z-50 max-w-[100dvw] "
    //         style={style}
    //       >
    //         <div className=" overflow-hidden max-h-screen h-full relative">
    //           <div className="absolute border-2 border-white w-[250px] h-[400px] finn "></div>
    //           <div className="absolute border-2 border-white w-[250px] h-[400px] jake "></div>
    //         </div>
    //       </animated.div>
    //     ) : (
    //       <>
    //         <div className="relative top-0 left-0 w-full h-full  ">
    //           {children}
    //         </div>
    //       </>
    //     )
    //   )}
    // </animated.div>
    <div className="relative top-0 left-0 w-full h-full  ">{children}</div>
  );
}
