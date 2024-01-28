import express from "express";
import cors from "cors";

import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { loginRouter } from "./routes/login.routes";
import { likeRouter } from "./routes/like.routes";
import { TweetController } from "./controllers/tweet.controller";

const app = express();
app.use(express.json());
app.use(cors());

const tweetController = new TweetController();

app.use("/usuario", usuarioRoutes());
app.use("/usuario/:id/tweet", tweetRoutes());
app.use("/login", loginRouter());
app.use("/usuario/:id/tweet/:idTweet/like", likeRouter());

app.get("/tweets", tweetController.listarTodosTweets);

app.listen(3333, () => {
    console.log("A API está rodando!");
});
