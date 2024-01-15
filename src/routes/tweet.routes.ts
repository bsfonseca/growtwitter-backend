import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";

export function tweetRoutes() {
    const router = Router();

    const tweetController = new TweetController();

    router.post("/", tweetController.criarTweet);
    router.get("/", tweetController.listarTweets);
    router.get("/:idTweet", tweetController.obterTweet);

    return router;
}
