"use client";
import { registerUser } from "@/app/actions";
import React, { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [message, setMessage] = useState("");

  const registerUserClient = async (e: any) => {
    e.preventDefault();
    const msg = await registerUser(name, email, password, cPassword);
    setMessage(msg);
  };

  return (
    <div>
      <form
        onSubmit={(e) => registerUserClient(e)}
        className="flex flex-col gap-3 max-w-sm "
      >
        <input
          className="text-black placeholder:text-black"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          name="name"
        />
        <input
          className="text-black placeholder:text-black "
          type="email"
          placeholder="Enter Email"
          name="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <input
          className="text-black placeholder:text-black "
          type="password"
          placeholder="Enter password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          name="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required
        />
        <input
          className="text-black placeholder:text-black "
          type="password"
          placeholder="Confirm password"
          name="c-password"
          value={cPassword}
          onChange={(e: any) => setCPassword(e.target.value)}
          required
        />
        <input type="submit" />
      </form>
      <h1>{message}</h1>
    </div>
  );
}
