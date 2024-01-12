import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { Usuario } from "../models/usuario.model";

export class UsuarioController {
    public async criarUsuario(req: Request, res: Response) {
        try {
            const { nome, email, username, senha } = req.body;

            if (!nome || !email || !username || !senha) {
                return res.status(400).send({
                    ok: false,
                    message: "Preencha todos os campos",
                });
            }
            if (senha.length < 5) {
                return res.status(400).send({
                    ok: false,
                    message: "A senha precisa conter mais de 5 digitos",
                });
            }
            const usuario = new Usuario(nome, email, username, senha);

            const result = await repository.usuario.create({
                data: usuario,
            });

            return res.status(201).send({
                ok: true,
                message: "Usuário cadastrado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
