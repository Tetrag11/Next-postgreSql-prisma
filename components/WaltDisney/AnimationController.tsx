"use client";
import React, { useRef } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import AnimationContext from "./AnimationContext";
import { useInView, useSpring } from "@react-spring/web";
import { useMediaQuery } from "usehooks-ts";

const constrain = 300;

export default function AnimationController({ children }: any) {
  const matches = useMediaQuery("(min-width: 768px)");
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [mouseExit, setMouseExit] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const container = useRef(null);
  const finn = useRef(null);
  const jake = useRef(null);
  const bemo = useRef(null);

  const share = useRef(null);
  const explore = useRef(null);
  const create = useRef(null);

  const calculateBackgroundColor = (xPosition: any, background: boolean) => {
    if (background) {
      if (xPosition <= windowWidth) {
        return "white";
      } else {
        return "black";
      }
    } else {
      if (xPosition >= windowWidth) {
        return "white";
      } else {
        return "black";
      }
    }
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth / 2);
  }, []);

  // stuff that changes background color
  const backgroundAnimation = useSpring({
    // backgroundColor: calculateBackgroundColor(x, true), // Initial position
    // config: { tension: 200, friction: 20 },
  });

  const foregroundAnimation = useSpring({
    // color: calculateBackgroundColor(x, false),
    // borderColor: calculateBackgroundColor(x, false),
    // config: { tension: 200, friction: 20 },
  });

  // stuff that makes finn and jake move

  const calculatePerspective = (
    x: any,
    y: any,

    finn: any,
    jake: any,
    bemo: any,
    human: boolean
  ) => {
    if (finn.current && jake.current && bemo.current) {
      if (human) {
        let finnInfo = finn.current.getBoundingClientRect();
        let bemoInfo = bemo.current.getBoundingClientRect();

        let calcX = -(y - finnInfo.y - finnInfo.height / 2) / constrain;
        let calcY = (x - finnInfo.x - finnInfo.width / 2) / constrain;

        let centery = -(y - bemoInfo.y - bemoInfo.height / 2) / constrain;
        let centerx = (x - bemoInfo.x - bemoInfo.width / 2) / constrain;

        return (
          "perspective(100px) " +
          "   rotateX(" +
          calcX +
          "deg) " +
          "   rotateY(" +
          calcY +
          "deg) "
        );
      } else {
        let jakeInfo = jake.current.getBoundingClientRect();

        let calcX = (y - jakeInfo.y - jakeInfo.height / 2) / constrain;
        let calcY = -(x - jakeInfo.x - jakeInfo.width / 2) / constrain;

        return (
          "perspective(100px) " +
          "   rotateX(" +
          calcX +
          "deg) " +
          "   rotateY(" +
          calcY +
          "deg) " +
          "scale(80%)"
        );
      }
    }
  };

  const calculateMoveText = (x: any, y: any, ref: any, constrain: any) => {
    if (ref.current) {
      let refInfo = ref.current.getBoundingClientRect();

      let calcX = (y - refInfo.y - refInfo.height / 2) / constrain;
      let calcY = (x - refInfo.x - refInfo.width / 2) / constrain;

      return "translateX(" + calcY * 10 + "px)";
    }
  };

  const moveTextShare = {
    transform: matches ? calculateMoveText(x, y, share, 500) : "",
    transition: "all 0.6s ease-out",
    config: { tension: 200, friction: 20 },
  };

  const moveFinn = {
    transform: matches
      ? calculatePerspective(x, y, finn, jake, bemo, true)
      : "",
    transition: "all 0.6s ease-out",
    config: { tension: 200, friction: 20 },
  };

  const stayFinn = {
    transform:
      "perspective(100px) translateX(0) translateY(0) rotateX(0) rotateY(0)",
    transition: "all 0.6s ease-out",
    config: { tension: 200, friction: 20 },
  };

  const stayJake = {
    transform:
      "perspective(100px) translateX(0) translateY(0) rotateX(0) rotateY(0) scale(80%)",
    transition: "all 0.6s ease-out",
    config: { tension: 200, friction: 20 },
  };

  const moveJake = {
    transform: matches
      ? calculatePerspective(x, y, finn, jake, bemo, false)
      : "",
    transition: "all 0.6s ease-out",
    config: { tension: 200, friction: 20 },
  };

  // Scroll in view animations

  const [ref, springs] = useInView(
    () => ({
      transition: "all 2s ease out",
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
    <AnimationContext.Provider
      value={{
        x,
        setX,
        y,
        setY,
        setMouseExit,
        mouseExit,
        backgroundAnimation,
        foregroundAnimation,
        finn,
        jake,
        bemo,
        share,
        explore,
        create,
        container,
        moveFinn,
        moveJake,
        stayFinn,
        stayJake,
        mouseEnter,
        setMouseEnter,
        moveTextShare,
        ref,
        springs,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
