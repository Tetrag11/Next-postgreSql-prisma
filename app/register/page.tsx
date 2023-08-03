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
    <div>
      <h1>this is register</h1>
      <RegisterForm />
    </div>
  );
}
