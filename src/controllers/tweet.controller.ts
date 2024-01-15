import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { adapterUsuario } from "../util/usuario.adapter";
import { Tweet } from "../models/tweet.model";

export class TweetController {
    public async criarTweet(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { conteudo, tipo } = req.body;

            if (!conteudo || !tipo) {
                return res.status(400).send({
                    ok: false,
                    message: "Preencha todos os campos",
                });
            }

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

            const usuarioBack = adapterUsuario(usuario);

            const tweet = new Tweet(conteudo, tipo, usuarioBack);

            const result = await repository.tweet.create({
                data: {
                    id: tweet.id,
                    conteudo: tweet.conteudo,
                    tipo: tweet.tipo,
                    idUsuario: usuario.id,
                },
            });

            return res.status(201).send({
                ok: true,
                message: "Tweet criado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async obterTweet(req: Request, res: Response) {
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
            return res.status(200).send({
                ok: true,
                message: "Tweet listado com sucesso",
                data: tweet,
            });
        } catch (error: any) {
            return error.toString();
        }
    }

    public async listarTweets(req: Request, res: Response) {
        try {
            const { id } = req.params;

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

            const tweets = await repository.tweet.findMany({
                where: {
                    idUsuario: id,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Tweets listado com sucesso",
                data: tweets,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
