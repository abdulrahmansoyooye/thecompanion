import { Request, Response } from "express"
import { asyncHandler } from "../lib/asyncHandler.ts"
import { AuthService } from "../services/auth.service.ts"

export const registerController = asyncHandler(
   async(req:Request,res:Response) => {
      const {email,password,role} = req.body

      const user = await AuthService.register(email,password,role)

      res.sendMessage(200,true,"User sucessfully Registered",user)
   }
)

export const loginController = asyncHandler(
   async(req:Request,res:Response) => {
      const {email,password} = req.body

      const user = await AuthService.login(email,password)

      res.sendMessage(200,true,"User logged In Successfully",user)
   }
)

export const getOneUser = asyncHandler(
   async(req:Request,res:Response) => {
      const userId = req.user!.userId

      const user = await AuthService.me(userId)

      res.sendMessage(200,true,"User fetched Successfully",user)
   }
)
