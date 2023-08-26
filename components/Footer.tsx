"use client";
import { useInView } from "@react-spring/web";
import Link from "next/link";
import React from "react";
import { animated } from "@react-spring/web";

export default function Footer() {
  const [ref, springs] = useInView(
    () => ({
      transition: "all 8s ease out",
      from: {
        opacity: 0,
        x: -100,
      },
      to: {
        opacity: 1,
        x: 0,
      },
    }),
    {
      rootMargin: "-40% 0%",
    }
  );
  return (
    <animated.div
      style={springs}
      ref={ref}
      className=" grid grid-cols-1 sm:grid-cols-[1.2fr_2fr] relative "
    >
      <animated.div
        style={springs}
        ref={ref}
        className="absolute w-full border-b border-black top-[50%]  -z-10"
      ></animated.div>
      <div className="sm:py-32 py-10">
        {" "}
        <h1 className="ml-auto mr-auto sm:mr-0 2xl:text-6xl sm:text-5xl  text-4xl w-fit bg-white">
          <span className="font-semibold">
            Social
            <span className="pl-1 2xl:text-7xl  sm:text-6xl text-5xl font-bold">
              X
            </span>
          </span>
        </h1>
      </div>
      <div className="grid grid-rows-2">
        <div className="flex items-end justify-self-center">
          <ul className="flex gap-5 sm:pl-20  ">
            <li>
              <Link className="text-2xl font-semibold" href={"/about"}>
                About
              </Link>
            </li>
            <li>
              <Link className="text-2xl font-semibold" href={"/contact"}>
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-2xl font-semibold" href={"/docs"}>
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center  sm:justify-end items-end ">
          <p className="text-base pb-3 sm:pr-10">
            © 2023 All rights reserved. SocialX Inc PLC Ltd.
          </p>
        </div>
      </div>
      <div></div>
    </animated.div>
  );
}
