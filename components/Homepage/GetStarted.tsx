import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { animated, useInView } from "@react-spring/web";
import AnimationContext from "../WaltDisney/AnimationContext";

export default function GetStarted() {
  const [ref, springs] = useInView(
    () => ({
      transition: "all 8s ease out",
      from: {
        opacity: 0,
        x: 100,
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

  const [heading, headingSprings] = useInView(
    () => ({
      transition: "all 8s ease out",
      from: {
        opacity: 0,
        y: 100,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      rootMargin: "-40% 0%",
    }
  );
  return (
    <div className="w-full lg:h-screen h-full   relative flex  justify-center items-center z-50">
      <div
        className=" grid md:grid-cols-[2fr_1fr] grid-cols-1 py-32 md:py-20 lg:py-0   h-full w-full  grid-rows-2  relative"
        style={{ rowGap: "50px" }}
      >
        <animated.div
          ref={heading}
          style={headingSprings}
          className="absolute bg-black w-full h-full -z-10 grid grid-rows-2"
        >
          <div className="w-full border-white border-b-[1px]"></div>
        </animated.div>
        <div className="absolute bg-black w-full h-full -z-20 grid grid-rows-2"></div>
        <div className="self-end pl-10">
          <h1 className="text-white text-7xl ">Get Started Right Now</h1>
        </div>
        <div className="row-span-2 h-full w-full md:flex justify-center items-center relative hidden">
          <Link
            className="p-3 border-white border-[1px] text-white text-lg relative z-10 bg-black "
            href={"/register"}
          >
            Sign Up
          </Link>
          <div className="absolute w-full h-full grid grid-cols-2 z-0">
            <animated.div
              ref={ref}
              style={springs}
              className="h-full border-white border-r-[1px]"
            ></animated.div>
            <animated.div
              ref={heading}
              style={headingSprings}
              className="h-full grid grid-rows-2"
            >
              <div className="border-white border-b-[1px]"></div>
            </animated.div>
          </div>
        </div>
        <div className="h-full flex items-start pl-10 flex-col gap-5">
          <p className=" text-lg text-white max-w-[550px]">
            Sign up for free, and experience the new form of social Media now.
            Already have an Account?{" "}
            <button
              onClick={() => {
                signIn();
              }}
            >
              <span className="underline">Login Instead</span>
            </button>
          </p>
          <Link
            className="p-3 border-white border-[1px] text-white text-lg relative z-10 bg-black md:hidden"
            href={"/register"}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
