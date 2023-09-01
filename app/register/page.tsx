import React from "react";
import { registerUser } from "../actions";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginLogout from "@/components/Authentication/LoginLogout";
import RegisterForm from "@/components/Authentication/RegisterForm";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <div>
        <h1>You are already logged in</h1>
        <LoginLogout session={session} />
      </div>
    );
  }
  return (
    <div className="w-full h-screen min-h-[600px] grid md:grid-cols-2 justify-center items-center grid-cols-1 md:gap-0 gap-5">
      <h1 className="2xl:text-[10rem] lg:text-9xl md:text-6xl sm:text-4xl text-3xl w-fit lg:justify-self-end justify-self-center">
        Social{" "}
        <span className="pl-1 text-4xl  2xl:text-[12rem] md:text-7xl  lg:text-[10rem] sm:text-5xl font-bold">
          X
        </span>
      </h1>
      <RegisterForm />
    </div>
  );
}
