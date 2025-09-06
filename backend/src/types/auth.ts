declare global {
    namespace Express {
        interface Response {
            sendMassage:(
                statusCode: number,
                message: string,
                data?: any,

            )=> Response;
        }
        interface Request {
            user?: {userId: string, role: string, email:string}
        }
    }
}