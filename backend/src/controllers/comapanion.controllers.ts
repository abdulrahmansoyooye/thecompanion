import { ComapnionServices } from "../services/companion.services.js";

export const createComapanion  = asyncHandler(async(req:Request, res:Response)=>{
    const userId = req.user!.userId;
    const payload = req.body;
    const comp = await ComapnionServices.create(userId,payload);
    return res.sendMessage(201,"Comapnion created Sucessfully", comp)
})