import prisma from "@/prisma";
import { compare } from "bcrypt";
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
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.isAdmin = true;
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };