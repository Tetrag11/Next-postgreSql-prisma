"use server"

import { redirect } from "next/dist/server/api-utils";
import prisma from "../../prisma/index";
import { hash } from 'bcrypt'


export const createProject = async(data:FormData) =>{
    const title = (data.get('title') ?? "") as any;

    if (!title) {
        throw new Error('Title is required');
    }


    return await prisma.project.create({
        data:{
            title
        }
    });

}

export const registerUser =async (name:any, email:any, password:any, cPassword:any) => {
   
   
    
    if (!name || !email || !password || !cPassword) {
        return ('Please fill all the fields')
    }

    if (password !== cPassword) {
        return('passwords dont match')
    }

    const exists = await prisma.user.findUnique({
        where:{email:email}
    }) .catch(async (e) => {
        console.error(e)
        process.exit(1)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

      if (!exists) {
     const hashedPassword = await hash(password, 12) as any;
        
     const createUser =  await prisma.user.create({
            data:{
                email:email,
                name:name,
                password: hashedPassword
            }
        }) .catch(async (e) => {
            console.error(e)
            process.exit(1)
          })
          .finally(async () => {
            await prisma.$disconnect()
          })


   return "User created successfully";
        
        
    }else{
       
        return "User already exists"
        
        
    }

}


















