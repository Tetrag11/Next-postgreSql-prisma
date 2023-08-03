import prisma from "@/prisma";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Clientsession from "../components/Clientsession";

const fetchProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>server Side Session calls</h1>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Side Server call</h2>
      <Clientsession />
    </div>
  );
}
