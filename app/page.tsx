import prisma from "@/prisma";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Clientsession from "../components/Clientsession";
import UploadButtonTemplate from "../components/CloudStorage/UploadButtonTemplate";
import StarterAnimation from "@/components/StarterAnimation";
import Navbar from "@/components/Navbar";

const fetchProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-full relative">
      <StarterAnimation />
      <div className="relative top-0 left-0 w-full h-full">
        <Navbar />
      </div>
    </div>
  );
}
