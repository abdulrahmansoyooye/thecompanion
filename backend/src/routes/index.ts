import { authRouter } from "./auth.routes.ts"


const baseUrl = "/api/v1"

export const router  = (app:any) =>{
    app.use(`${baseUrl}/auth`,authRouter)
    // app.use(`${baseUrl}/companions`)
    // app.use(`${baseUrl}/conversations`)
}