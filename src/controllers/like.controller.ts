import { Request, Response } from "express";
import repository from "../database/prisma.repository";

export class LikeController {
    public async criarLike(req: Request, res: Response) {
        try {
            const { idTweet, id } = req.params;

            const usuario = await repository.usuario.findUnique({
                where: {
                    id: id,
                },
            });

            if (!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado",
                });
            }

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet,
                },
            });

            if (!tweet) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado",
                });
            }

            // Verifica se já tem like

            const result = await repository.like.findFirst({
                where: {
                    idUsuario: id,
                    idTweet,
                },
            });

            if (result) {
                return res.status(400).send({
                    ok: false,
                    message: "Esse tweet já foi curtido pelo usuário",
                });
            }

            await repository.like.create({
                data: {
                    idTweet,
                    idUsuario: id,
                },
            });

            return res.status(201).send({
                ok: true,
                message: "Like criado com sucesso",
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
    public async deletarLike(req: Request, res: Response) {
        try {
            const { id, idTweet } = req.params;
            const usuario = await repository.usuario.findUnique({
                where: {
                    id,
                },
            });
            if (!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado",
                });
            }

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet,
                },
            });
            if (!tweet) {
                return res.status(404).send({
                    ok: false,
                    message: "Tweet não encontrado",
                });
            }

            const like = await repository.like.findUnique({
                where: {
                    idUsuario_idTweet: {
                        idTweet,
                        idUsuario: id,
                    },
                },
            });

            if (!like) {
                return res.status(404).send({
                    ok: false,
                    message: "Like não encontrado",
                });
            }

            await repository.like.delete({
                where: {
                    idUsuario_idTweet: {
                        idTweet,
                        idUsuario: id,
                    },
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Like excluído com sucesso",
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
