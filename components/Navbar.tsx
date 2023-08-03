import Link from "next/link";
import React from "react";
import LoginLogout from "./Authentication/LoginLogout";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-full justify-between max-w-screen-lg mx-auto">
      <Link href={"/"}>
        <h1>HomePage</h1>
      </Link>
      <ul className="flex gap-3">
        <li>{!session?.user && <Link href={"/register"}>Sign Up</Link>}</li>

        <li>
          <LoginLogout session={session} />
        </li>
      </ul>
    </div>
  );
}
