import { Router } from "express";
import { validaLoginMiddleware } from "../middlewares/login.middleware";
import { LikeController } from "../controllers/like.controller";

export function likeRouter() {
    const router = Router({
        mergeParams: true,
    });
    const likeController = new LikeController();

    router.post("/", [validaLoginMiddleware], likeController.criarLike);
    router.delete("/", [validaLoginMiddleware], likeController.deletarLike);
    return router;
}
