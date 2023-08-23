"use client";
import React, { useRef } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import AnimationContext from "./AnimationContext";
import { useSpring } from "@react-spring/web";

const constrain = 500;

export default function AnimationController({ children }: any) {
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const container = useRef(null);
  const finn = useRef(null);
  const jake = useRef(null);

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
    container: any,
    finn: any,
    jake: any,
    human: boolean
  ) => {
    if (finn.current && jake.current) {
      if (human) {
        let finnInfo = finn.current.getBoundingClientRect();

        let calcX = -(y - finnInfo.y - finnInfo.height / 2) / constrain;
        let calcY = (x - finnInfo.x - finnInfo.width / 2) / constrain;

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
          "deg) "
        );
      }
    }
  };

  const moveFinn = {
    transform: calculatePerspective(x, y, container, finn, jake, true),

    config: { tension: 200, friction: 20 },
  };

  const moveJake = {
    transform: calculatePerspective(x, y, container, finn, jake, false),

    config: { tension: 200, friction: 20 },
  };

  return (
    <AnimationContext.Provider
      value={{
        x,
        setX,
        y,
        setY,
        backgroundAnimation,
        foregroundAnimation,
        finn,
        jake,
        container,
        moveFinn,
        moveJake,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
