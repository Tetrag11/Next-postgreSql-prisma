"use server"

import { redirect } from "next/dist/server/api-utils";
import prisma from "../../prisma/index";
import { hash } from 'bcrypt'
import { utapi } from "uploadthing/server";


export const createProject = async (data: FormData) => {
    const title = (data.get('title') ?? "") as any;

    if (!title) {
        throw new Error('Title is required');
    }


    return await prisma.project.create({
        data: {
            title
        }
    });

}

export const registerUser = async (name: any, email: any, password: any, cPassword: any) => {



    if (!name || !email || !password || !cPassword) {
        return ('Please fill all the fields')
    }

    if (password !== cPassword) {
        return ('passwords dont match')
    }

    const exists = await prisma.user.findUnique({
        where: { email: email }
    }).catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
        .finally(async () => {
            await prisma.$disconnect()
        })

    if (!exists) {
        const hashedPassword = await hash(password, 12) as any;

        const createUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword
            }
        }).catch(async (e) => {
            console.error(e)
            process.exit(1)
        })
            .finally(async () => {
                await prisma.$disconnect()
            })


        return "User created successfully";


    } else {

        return "User already exists"


    }

}



export const createPost = async (content: any, title: any, urls: any, email: any) => {
    if (!title || !content) {

        urls.map(async (url: any) => {
            console.log('Deleted files are:', url);

            if (url.fileKey !== null) {
                await utapi.deleteFiles(url.fileKey);
            }

        })

        return ('Title or content is empty');
    }


    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
    
        if (!user) {
            return ('User not Found');
        }
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorEmail: email
            }
        })

         // Step 3: Associate Media
    const mediaRecords = await Promise.all(
        urls.map((url :any) =>
          prisma.media.create({
            data: {
              url: url.fileUrl,
              key:url.fileKey,
              postId: newPost.id,
            },
          })
        )
      );
  
    return('New post and media created:'+ newPost + mediaRecords);
    } catch (error) {
        console.error('Error creating post:', error);
    }finally{
        await prisma.$disconnect();
    }

   


}















