import { requireAuth } from "../middlewares/auth.ts"
import { authRouter } from "./auth.routes.ts"
import { companionRouter } from "./companion.routes.ts"


const baseRoute = "/api/v1"

export const router  = (app:any) =>{
    app.use(`${baseRoute}/auth`,authRouter)
    app.use(`${baseRoute}/companions`,requireAuth,companionRouter)
    // app.use(`${baseUrl}/conversations`)
}