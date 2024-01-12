import express from "express";
import { UsuarioController } from "./controllers/usuario.controller";

const app = express();
app.use(express.json());

//Instâncias
const usuarioController = new UsuarioController();

//Rotas Usuário
app.post("/usuario", usuarioController.criarUsuario);
app.get("/usuario", usuarioController.obterUsuario);
app.get("/usuario/:id", usuarioController.ObterUsuarioId);

app.listen(3333, () => {
    console.log("A API está rodando!");
});
