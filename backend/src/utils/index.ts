import jwt from "jsonwebtoken";
import { AppError } from "../lib/errors/AppError.ts"

export const messageHandler = (message:string, success:boolean, statusCode:number, data:any) =>{

    return {message,success,statusCode,data}

}



export const generateAcessToken =async (
    payload:object,
    expiresIn: string | number = "15m"
)=>{

    const secret = process.env.JWT_SECRET
  if(secret){
    throw new AppError("Jwt is missing in .env file", 500, "JWT_MISSING");
  }


  return jwt.sign(payload,secret,{expiresIn})
}