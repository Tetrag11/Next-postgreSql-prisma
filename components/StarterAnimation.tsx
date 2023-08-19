"use client";
import { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";

export default function StarterAnimation() {
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

  return killAnimation((style, item) =>
    item ? (
      <animated.div
        className="w-full h-screen absolute top-0 left-0 bg-black z-50 max-w-[100dvw] "
        style={style}
      >
        <div className=" overflow-hidden max-h-screen h-full relative">
          <div className="absolute border-2 border-white w-[250px] h-[400px] finn "></div>
          <div className="absolute border-2 border-white w-[250px] h-[400px] jake "></div>
        </div>
      </animated.div>
    ) : null
  );
  // return (
  //   <div className="w-full h-screen absolute top-0 left-0 bg-black z-50 max-w-[100dvw]">
  //     <div className=" overflow-hidden max-h-screen h-full relative">
  //       <div className="absolute border-2 border-white w-[250px] h-[400px] finn "></div>
  //       <div className="absolute border-2 border-white w-[250px] h-[400px] jake "></div>
  //     </div>
  //   </div>
  // );
}
