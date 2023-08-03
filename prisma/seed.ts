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