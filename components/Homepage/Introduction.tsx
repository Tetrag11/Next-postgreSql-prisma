"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { animated, useInView, useSpring } from "@react-spring/web";
import { Waypoint } from "react-waypoint";
import AnimationContext from "../WaltDisney/AnimationContext";

export default function Introduction() {
  const [inView, setInview] = useState(false);

  const transition = useSpring({
    delay: 500,
    to: {
      y: !inView ? 24 : 0,
      opacity: !inView ? 0 : 1,
    },
  });
  return (
    <Waypoint onEnter={() => setInview(true)}>
      <animated.div
        style={transition}
        className="w-full   lg:h-screen h-full min-h-fit grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-10 border-black border-t-[1px]  bg-white relative z-30 "
      >
        <div className="flex flex-col lg:items-end items-center justify-end gap-14 md:pt-0 pt-5">
          <h1 className="2xl:text-6xl sm:text-5xl  text-4xl">
            What is{" "}
            <span className="font-semibold">
              Social
              <span className="pl-1 2xl:text-7xl  sm:text-6xl text-5xl font-bold">
                X
              </span>
            </span>
          </h1>
          {/* mobile */}
          <article className="max-w-[300px] md:flex flex-col gap-3 justify-center self-center lg:hidden hidden ">
            <p className="font-semibold text-lg ">
              The only Platform you need to share your memories to the world
            </p>
            <ul
              style={{ listStyleType: "disc" }}
              className="flex flex-col self-center w-fit"
              w-fit
            >
              <li className="text-lg">Easy To use.</li>
              <li className="text-lg">Simple Design, no complexity.</li>
              <li className="text-lg">Secure and reliable.</li>
            </ul>
          </article>
        </div>
        <div className="flex justify-center  lg:pt-0 pt-5">
          <div
            style={{ gridTemplateRows: "1fr auto" }}
            className="card w-full max-w-[320px]  h-[550px]  border-2 border-black grid p-3 gap-3"
          >
            <Image
              src={"/intro.webp"}
              width={320}
              height={550}
              alt="PostExample"
              className="object-cover w-full h-full max-h-[450px]"
            ></Image>
            <p className="w-full h-full font-semibold">
              Had my first day at work today! Everyone was so nice. looking
              forward for future endeavors with yall!{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-start self-center md:justify-self-start justify-self-center md:hidden lg:flex">
          <article className="max-w-[300px] 2xl:max-w-[350px] flex flex-col gap-3 justify-center md:pt-20">
            <p className="font-semibold text-lg 2xl:text-2xl">
              The only Platform you need to share your memories to the world
            </p>
            <ul
              style={{ listStyleType: "disc" }}
              className="flex flex-col self-center w-fit"
              w-fit
            >
              <li className="text-lg 2xl:text-xl">Easy To use.</li>
              <li className="text-lg 2xl:text-xl">
                Simple Design, no complexity.
              </li>
              <li className="text-lg 2xl:text-xl">Secure and reliable.</li>
            </ul>
          </article>
        </div>
      </animated.div>
    </Waypoint>
  );
}
