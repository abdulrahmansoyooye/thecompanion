import { prisma } from "../lib/prisma.ts"



export async function checkDatabaseConnection(){
    try {
       await prisma.$queryRaw`SELECT 1`;
       console.log("Database connected successfully");

    } catch (error) {
        console.log("Database connection Failed")
        console.error(error)
        process.exit(1)
    }
}