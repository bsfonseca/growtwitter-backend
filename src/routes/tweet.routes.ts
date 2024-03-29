import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { validaLoginMiddleware } from "../middlewares/login.middleware";

export function tweetRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const tweetController = new TweetController();

    router.post("/", [validaLoginMiddleware], tweetController.criarTweet);
    router.get("/", [validaLoginMiddleware], tweetController.listarTweets);
    router.get("/:idTweet", [validaLoginMiddleware], tweetController.obterTweet);
    router.put("/:idTweet", [validaLoginMiddleware], tweetController.atualizarTweet);
    router.delete("/:idTweet", [validaLoginMiddleware], tweetController.deletarTweet);

    router.get("/all", [validaLoginMiddleware], tweetController.listarTodosTweets);

    return router;
}
