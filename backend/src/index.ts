import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import type {RequestHandler} from "express"
import cookieParser from "cookie-parser"
import { router } from "./routes/index.js"
dotenv.config();
const app = express()

const port =  process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(morgan("dev") as RequestHandler);
app.use(cookieParser())

router(app)


app.get("/",(_,res)=>{
    res.send("Backend Connected Successfully")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

