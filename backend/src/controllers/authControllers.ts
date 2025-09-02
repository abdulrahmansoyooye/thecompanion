export const registerController =async (req,res)=>{
   try {
    
      await registerUserService(req.body,(result)=>{
        res.status(result.statusCode).json(result)
     })

   } catch (error:any) {
    res.status(error.statusCode || 500).json(
        {message:error.message||"Internal server error"}
    )
   }
}