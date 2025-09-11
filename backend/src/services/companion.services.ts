import { prisma } from "../lib/prisma.ts"


export const ComapnionService = {
   async create(userId:string | undefined, payload:any){
    
      return prisma.companion.create({
      data:{
            userId,
         ...payload
      }
      })
   },
   async list(){
      // return 
   },
   async getOne(){

   },
   async update(){

   },
   async remove(){
      
   }
}