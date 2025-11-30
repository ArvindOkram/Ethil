import router, { Router } from "express";
import authcontroller from "../../controllers/auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const authRouter: Router = router();

authRouter.post(
    "/login",
    authcontroller.login
);

authRouter.post(
    "/logout",
    authenticate,
    authcontroller.logout
);

authRouter.post(
    "/sign-up",
    authcontroller.signUp
);

export default authRouter;