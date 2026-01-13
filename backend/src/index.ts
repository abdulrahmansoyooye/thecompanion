import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import type { RequestHandler, Response } from "express"
import cookieParser from "cookie-parser"
import { responseMiddleware } from "./middlewares/response.js"
import { errorMiddleware } from "./middlewares/error.js"
import { loggerMiddleware } from "./middlewares/logger.middleware.js"
import { router } from "./routes/index.js"
import logger from "./lib/logger.js"

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(cookieParser());
app.use(responseMiddleware);

router(app);

app.get("/", (_, res: Response) => {
    res.send("Backend Connected Successfully");
});

// Error handling must be last
app.use(errorMiddleware);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});


