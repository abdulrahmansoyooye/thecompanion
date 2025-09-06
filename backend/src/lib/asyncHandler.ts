export const asyncHandler = (fn:Request) => (req:Request,res:Response,next:Nextfunction)=>{
   Promise.resovle(fn(req,res,next)).catch(next)
}