"use server"


import prisma from "../../prisma/index";
import { hash } from 'bcrypt'
import { utapi } from "uploadthing/server";
import { useRouter } from 'next/navigation'


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
  
    return(true);
    } catch (error) {
        console.error('Error creating post:', error);
    }finally{
        await prisma.$disconnect();
    }

   


}


export const getPosts = async(userEmail:any) =>{
    if (userEmail !== null) {
        const userPostsWithMedia = await prisma.user.findUnique({
          where: { email: userEmail },
          select: {
            id: true,
            createdAt: true,
            name: true,
            email: true,
            posts: {
              select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                authorEmail: true,
                public: true,
                media: {
                  select: {
                    id: true,
                    url: true,
                    key: true,
                  },
                },
              },
            },
          },
        });
    
        return userPostsWithMedia;
      }
}


export const deletePost = async (postId:number) =>{
   if (postId !== null) {
    const deletePost = await prisma.post.findUnique({
        where: {id: postId},
        include:{
            media:true
        }

    });
    if(deletePost){
        for(const media of deletePost.media){
            if (media.key) {
                await utapi.deleteFiles(media.key);
                await prisma.media.delete({
                    where: { id: media.id },
                  });
            }
          
        }

        await prisma.post.delete({
            where: { id: postId },
          });
          return true;
    }else{
        return true;
    }
   
   }
}

export const deleteAllPosts =async (userEmail:string) => {
     // Find the user by their email
const userToDelete = await prisma.user.findUnique({
    where: { email: userEmail },
    include:{
        posts:true
    }
  });
  
  if (userToDelete) {
    // Iterate through the user's posts and delete each post along with its media
    for (const post of userToDelete.posts) {
      // Delete associated media for the post
    //   for (const media of post.media) {
    //     await prisma.media.delete({
    //       where: { id: media.id },
    //     });
    //   }
//    await prisma.media.delete({
//         where:{id:post.id}
//     })
  
//       // Delete the post itself
//       await prisma.post.delete({
//         where: { id: post.id },
//       });
const deletePost = await prisma.post.findUnique({
    where: {id: post.id},
    include:{
        media:true
    }

});
if(deletePost){
    await prisma.media.deleteMany({
        where:{id: deletePost.id},
    })

    await prisma.post.delete({
        where: { id: post.id },
      });
      return true;
}else{
    return true;
}

    }
  
    console.log(`All posts of user along with associated media deleted.`);
  } else {
    console.log(`User with email not found.`);
  }
}









