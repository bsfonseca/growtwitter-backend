import express from "express";

import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { loginRouter } from "./routes/login.routes";

const app = express();
app.use(express.json());

app.use("/usuario", usuarioRoutes());
app.use("/usuario/:id/tweet", tweetRoutes());
app.use("/login", loginRouter());

app.listen(3333, () => {
    console.log("A API está rodando!");
});
