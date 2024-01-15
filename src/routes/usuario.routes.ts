import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

export function usuarioRoutes() {
    const router = Router();

    //Instâncias
    const usuarioController = new UsuarioController();

    //Rotas Usuário
    router.post("/", usuarioController.criarUsuario);
    router.get("/", usuarioController.obterUsuario);
    router.get("/:id", usuarioController.ObterUsuarioId);

    return router;
}