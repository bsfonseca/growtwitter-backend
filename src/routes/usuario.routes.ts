import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { validaLoginMiddleware } from "../middlewares/login.middleware";

export function usuarioRoutes() {
    const router = Router();

    //Instâncias
    const usuarioController = new UsuarioController();

    //Rotas Usuário
    router.post("/", usuarioController.criarUsuario);
    router.get("/", usuarioController.listarUsuarios);
    router.get("/:id", usuarioController.obterUsuarioId);
    router.put("/:id", [validaLoginMiddleware], usuarioController.atualizarUsuario);
    router.delete("/:id", usuarioController.deletarUsuario);

    return router;
}
