export const requireAuth = (req:Request,res:Response,next:Nextfunction) =>{
    const auth  = req.headers.authorization;

    if(!auth) throw new AppError()
}