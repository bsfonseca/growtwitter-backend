import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { randomUUID } from "crypto";

export class LoginController {
    public async login(req: Request, res: Response) {
        try {
            const { username, senha } = req.body;

            if (!username || !senha) {
                return res.status(400).send({
                    ok: false,
                    message: "Campos não informados",
                });
            }

            const usuario = await repository.usuario.findFirst({
                where: {
                    username,
                    senha,
                },
            });

            if (!usuario) {
                return res.status(401).send({
                    ok: false,
                    message: "Usuário inválido",
                });
            }

            const token = randomUUID();

            await repository.usuario.update({
                where: {
                    id: usuario.id,
                },

                data: {
                    token,
                },
            });
            return res.status(200).send({
                ok: true,
                message: "Login realizado com sucesso",
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    token,
                    urlPhoto: usuario.urlPhoto,
                    username: usuario.username,
                },
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
