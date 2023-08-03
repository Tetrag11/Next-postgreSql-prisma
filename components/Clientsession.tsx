"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function Clientsession() {
  const { data: session } = useSession();
  return <pre>{JSON.stringify(session)}</pre>;
}
