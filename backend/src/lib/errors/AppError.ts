export class AppError extends Error{
    public statusCode: number;
    public message:string;
    public data ?:any

    constructor(message:string, statusCode=500, data:string){
        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        Error.captureStackTrace(this,this.constructor)
    }
}