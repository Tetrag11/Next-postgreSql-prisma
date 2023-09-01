"use client";
import { registerUser } from "@/app/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [disabled, setdisabled] = useState(false);

  const registerUserClient = async (e: any) => {
    e.preventDefault();
    setdisabled(true);
    const msg = await registerUser(name, email, password, cPassword);
    setMessage(msg);
    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setdisabled(false);
  };

  if (message === "User created successfully") {
    router.push(
      "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard"
    );
  }
  return (
    <div className="justify-self-center w-full">
      <form
        onSubmit={(e) => registerUserClient(e)}
        className="flex flex-col gap-10 py-10 px-10 max-w-[500px] mx-auto w-full border-2 border-black rounded-sm"
      >
        {message && <h1 className="text-center">{message}</h1>}
        <div className="flex flex-col gap-3">
          <label htmlFor="Name">User Name:</label>
          <input
            className="text-black placeholder:text-black border border-black p-3 focus:bg-black focus:placeholder:text-white focus:text-white"
            autoComplete="off"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            name="name"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email:</label>
          <input
            className="text-black placeholder:text-black border border-black p-3 focus:bg-black focus:placeholder:text-white focus:text-white"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password:</label>
          <input
            className="text-black placeholder:text-black border border-black p-3 focus:bg-black focus:placeholder:text-white focus:text-white"
            type="password"
            placeholder="Enter password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            name="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="cPassword">Confirm Password:</label>
          <input
            className="text-black placeholder:text-black border border-black p-3 focus:bg-black focus:placeholder:text-white focus:text-white"
            type="password"
            placeholder="Confirm password"
            name="c-password"
            value={cPassword}
            onChange={(e: any) => setCPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <input
            className="bg-black text-white p-3 cursor-pointer disabled:bg-gray-500 disabled:pointer-events-none"
            disabled={disabled}
            type="submit"
          />
          <p className="text-center">
            {" "}
            Already have an Account?{" "}
            <button
              onClick={() => {
                signIn();
              }}
            >
              <span className="underline">Login Instead</span>
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
