import { StatusCodes } from "../src/constants/statusCodes"
import { messageHandler } from "../src/utils"
import {z} from "zod"
export const userSchema = z.object({
  username: z.string() .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .trim(),
  
  email: z.string()
    .email("Invalid email format")
    .toLowerCase(),
  role: z.enum(["DEVELOPER" ,"STUDENT" ]),
});

export const validate = (schema:any) => (req:any,res:any,next:any)=> {
   try {
    schema.parse(req.body)
    next()
   } catch (error) {
      messageHandler("An Error occurred while validating your request", false, StatusCodes.INTERNAL_SERVER_ERROR,{})
   }
}