import { Router } from "express";
import { LoginController } from "../controllers/login.controller";

export function loginRouter() {
    const router = Router({
        mergeParams: true,
    });

    const loginController = new LoginController();

    router.post("/", loginController.login);

    return router;
}
