import { requireAuth } from "../middlewares/auth.js"
import { authRouter } from "./auth.routes.js"
import { companionRouter } from "./companion.routes.js"
import { conversationRouter } from "./conversation.routes.js"

const baseRoute = "/api/v1"

export const router = (app: any) => {
    app.use(`${baseRoute}/auth`, authRouter)
    app.use(`${baseRoute}/companions`, requireAuth, companionRouter)
    app.use(`${baseRoute}/conversations`, requireAuth, conversationRouter)
}
