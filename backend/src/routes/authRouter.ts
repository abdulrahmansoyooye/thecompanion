
import { express } from 'express';
import { userSchema, validate } from '../validations';
import { registerController } from '../controllers/authControllers';

export const authRouter = express.Router();


authRouter.post("/register",validate(userSchema),registerController )
authRouter.post("/login",)
authRouter.get("/:id",)