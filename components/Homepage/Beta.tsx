"use client";
import { useSpring, animated } from "@react-spring/web";
import React, { useState } from "react";
import { Waypoint } from "react-waypoint";

export default function Beta() {
  const [inView, setInview] = useState(false);
  const transition = useSpring({
    delay: 400,
    config: { duration: 500 },
    to: {
      y: !inView ? 24 : 0,
      opacity: !inView ? 0 : 1,
    },
  });
  const [inView2, setInview2] = useState(false);
  const transition2 = useSpring({
    delay: 500,
    config: { duration: 500 },
    to: {
      y: !inView2 ? 24 : 0,
      opacity: !inView2 ? 0 : 1,
    },
  });

  const [inView3, setInview3] = useState(false);
  const transition3 = useSpring({
    delay: 500,
    config: { duration: 500 },
    to: {
      y: !inView3 ? 24 : 0,
      opacity: !inView3 ? 0 : 1,
    },
  });

  const [inView4, setInview4] = useState(false);
  const transition4 = useSpring({
    delay: 500,
    config: { duration: 500 },
    to: {
      y: !inView4 ? 24 : 0,
      opacity: !inView4 ? 0 : 1,
    },
  });

  return (
    <div className="w-full h-full  grid sm:grid-rows-[400px_400px]  grid-rows-[500px_500px]">
      <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 pt-10 bg-black sm:px-20 px-10">
        <Waypoint
          onEnter={() => {
            setInview(true);
          }}
        >
          <animated.h2
            style={transition}
            className="text-xl text-white md:max-w-[300px] max-w-[400px] md:text-left text-center md:justify-self-start justify-self-center"
          >
            <span className="font-semibold text-2xl ">
              Social
              <span className="  text-3xl font-bold">X</span>
            </span>{" "}
            is currently on its beta stages right now.
          </animated.h2>
        </Waypoint>

        <Waypoint
          onEnter={() => {
            setInview2(true);
          }}
        >
          <animated.article
            style={transition2}
            className="max-w-[400px] md:flex flex-col gap-3 justify-center md:justify-self-end justify-self-center self-end pb-10  "
          >
            <p className="font-semibold md:text-3xl text-xl text-white ">
              What You can do now
            </p>
            <ul
              style={{ listStyleType: "none" }}
              className="flex flex-col self-center w-fit"
              w-fit
            >
              <li className="md:text-lg text-base text-white flex place-items-center gap-2">
                <span className="rounded-full w-2 h-2 border-white border block"></span>
                Create an account.
              </li>
              <li className="md:text-lg text-base text-white flex place-items-center gap-2">
                <span className="rounded-full w-2 h-2 border-white border block"></span>
                Create or Delete a post.
              </li>
              <li className="md:text-lg text-base text-white flex place-items-center gap-2">
                <span className="rounded-full w-2 h-2 border-white border block"></span>
                Explore other users’s posts after logging in.
              </li>
            </ul>
          </animated.article>
        </Waypoint>
      </div>
      <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 pt-10  sm:px-20 px-10">
        <Waypoint
          onEnter={() => {
            setInview3(true);
          }}
        >
          <animated.h2
            style={transition3}
            className="text-3xl   md:text-left text-center self-center justify-self-center"
          >
            What you will have in the future
          </animated.h2>
        </Waypoint>
        <Waypoint
          onEnter={() => {
            setInview4(true);
          }}
        >
          <animated.article
            style={transition4}
            className="max-w-[400px] md:flex flex-col gap-3 justify-center self-center justify-self-center  "
          >
            <ul
              style={{ listStyleType: "disc" }}
              className="flex flex-col self-center w-fit"
              w-fit
            >
              <li className="md:text-lg text-base  ">
                Ability to update posts.
              </li>
              <li className="md:text-lg text-base  ">
                Like incrementor for posts.
              </li>
              <li className="md:text-lg text-base  ">
                Optimised mobile experience ( mobile rating form page speeds
                were 73% while desktop ratings were at peak over 90)
              </li>
            </ul>
          </animated.article>
        </Waypoint>
      </div>
    </div>
  );
}
