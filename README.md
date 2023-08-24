Next Auth Setup

1.  app/api/[...nextauth]/route

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

2.  Add env variables in .env.local

NEXTAUTH_SECRET=secret
NEXTAUTH_URL =

3.  Now you can go to to check if the sign up works

4.  You can get Session data in your page.tsx or layout.tsx using this:

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

5.  Get your session data to your /api using this app/api/route.ts:
    note: this is fetching session data serverside

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {authOptions} from "./auth/[...nextauth]/route"

export async function GET(request:Request){
const session = await getServerSession(authOptions)
console.log('get api:', session);

    return NextResponse.json({authenticated: !!session})

}

6.  Get session data using client side
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

7.  Prisma seed database(add a record manually, you are going to need this first for your authentication).

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

8.  Now that you have added a user to your database, create the authentication process in /app/api/[...nextauth]/route.

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

2.  Prisma SetUp with Vercel
3.  UploadThing Setup
4.  Crud Options with Server Actions
5.  Global level Animations with react context
