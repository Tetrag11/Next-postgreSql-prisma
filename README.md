Next Auth Setup

1. app/api/[...nextauth]/route

Basic Example

import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
session: {
strategy: "jwt",
},
providers: [
CredentialsProvider({
name: "Sign in",
credentials: {
email: {
label: "Email",
type: "email",
placeholder: "example@example.com",
},
password: { label: "Password", type: "password" },
},
async authorize(credentials) {
const user = { id: "1", name: "Admin", email: "admin@admin.com" };
return user;
},
}),
],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

2. Add env variables in .env.local

NEXTAUTH_SECRET=secret
NEXTAUTH_URL =

3. Now you can go to to check if the sign up works

4. You can get Session data in your page.tsx or layout.tsx using this:

import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const fetchProjects = async () => {
const projects = await prisma.project.findMany();
return projects;
};

export default async function Home() {
const projects = await fetchProjects();
const session = await getServerSession(authOptions);

return (

{JSON.stringify(session)}

);
}

5. Get your session data to your /api using this app/api/route.ts:
    note: this is fetching session data serverside

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {authOptions} from "./auth/[...nextauth]/route"

export async function GET(request:Request){
const session = await getServerSession(authOptions)
console.log('get api:', session);

    return NextResponse.json({authenticated: !!session})

}

6. Get session data using client side
    Create a context provider

        /app/provider.tsx

        "use client";
        import React from "react";
        import { SessionProvider } from "next-auth/react";

        type Props = {
        children: React.ReactNode;
        };

        export const Provider = ({ children }: Props) => {
        return  {children};
        };

        Wrap rootlayout within context provider
        {children}

        Make client component to show session data like this:
        "use client";
        import { useSession } from "next-auth/react";
        import React from "react";

        export default function Clientsession() {
        const { data: session } = useSession();
        return

    {JSON.stringify(session)}
    ;
    }

7. Prisma seed database(add a record manually, you are going to need this first for your authentication).

    add the following script to your package.json
    "prisma": {
    "seed": "ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts"
    },
    create a new file called seed.ts in prisma folder.
    /prisma/seed.ts
    import { PrismaClient } from '@prisma/client'
    import { hash } from 'bcrypt'

          const prisma = new PrismaClient()
          async function main() {


          const password = await hash('test', 12) as any;

          const bob = await prisma.user.upsert({
            where:{email:'bob@bobthegreatestalive.com'},
            update:{},
            create:{
              email:'bob@bobthegreatestalive.com',
              name:"bob",
              password
            }
          })
            console.log({bob});

          }
          main()
            .then(async () => {
              await prisma.$disconnect()
            })
            .catch(async (e) => {
              console.error(e)
              await prisma.$disconnect()
              process.exit(1)
            })

         run command npx prisma db seed(u should already have a table created in the db for this, run npx prisma db push if your database isnt updated)

8. Now that you have added a user to your database, create the authentication process in /app/api/[...nextauth]/route.

async authorize(credentials) {
if(!credentials?.email || !credentials.password){
return null
}
const user = await prisma.user.findUnique({
where:{
email: credentials.email
}
});
if (!user) {
return null
}
const isPasswordValid = await compare(credentials.password, user.password);
if (!isPasswordValid) {
return null
}
return{
id: user.id + '',
email:user.email,
name:user.name
}
},

2. Prisma SetUp with Vercel
3. UploadThing Setup
4. Crud Options with Server Actions
5. Global level Animations with react context

# Animation controll

In react animations, this projects goes with a global scale animations which brings all the animations from one context provider.

``
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

  React spring is used as the main animation framework, Animations with react spring is straightforward and simple.
  The main hooks used from react spring is  "useInView, useSpring, useTransition".

## useSpring

    This is the base hook that is used for transition animations, it can be static or linked to event listeners. 

### Use Cases

For useSpring, initiate the initial animation with the useSpring hook and assign it to a variable.

     `
  // stuff that changes background color
  const backgroundAnimation = useSpring({
    backgroundColor: calculateBackgroundColor(x, true), // Initial position
    config: { tension: 200, friction: 20 },
  });`

  <animated.div style={foreground}> </animated.div>
  
then assign the variable inside the HTML element as an attribute. Make sure to imported {animated} and assign it before the element.

## useTransition

    This hooks allows animations when the components are mounted, for example, if there is a component that only gets rendered if a certain value is returned true.

     const [timer, setTimer] = useState(false);

     return( 
      {timer && <div></div>}
     )

    In this case, the div only gets rendered if the timer is set to 2. This is very useful when rendering conditional components, but its almost impossible to put fluid animations to these components natively. This the where useTransition hook comes in from react spring.


    const [timer, setTimer] = useState(false); 

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

  With useEffect, the timer variable is set to false after 2 seconds. 
     {killAnimation((style, item) =>
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
           ) : (
             <>
               <div className="relative top-0 left-0 w-full h-full  ">
                 <Navbar />
                 {children}
               </div>
             </>
           )
         )}
  With this step it makes sure that the first div will be rendered and leave the DOM with an animation, only after that animation is finished the other element will get rendered.
