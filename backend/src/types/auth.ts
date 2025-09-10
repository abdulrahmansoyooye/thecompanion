

declare global {
    namespace Express {
        interface Response {
            sendMessage:(
                statusCode: number,
                success:boolean,
                message: string,
                data?: any,

            )=> Response;
        }
        interface Request {
            user?: {userId: string, role: string, email:string},
           
        }
        
        
    }
}