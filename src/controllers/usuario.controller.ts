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
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    username: usuario.username,
                    senha,
                },
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

    // Listar usuário
    public async listarUsuarios(req: Request, res: Response) {
        try {
            const result = await repository.usuario.findMany();
            return res.status(200).send({
                ok: true,
                message: "Lista obtida com sucesso",
                data: result,
            });
        } catch (error: any) {
            return error.toString();
        }
    }

    //Listar usuário pelo ID
    public async obterUsuarioId(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usuario = await repository.usuario.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    username: true,
                    token: true,
                    tweets: true,
                    likes: true,
                },
            });

            if (!usuario) {
                return res.status(400).send({
                    ok: false,
                    message: "Usuário inexistente",
                });
            }
            return res.status(200).send({
                ok: true,
                message: "Usuário obtido com sucesso",
                data: usuario,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async atualizarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            if (!nome) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe o para atualizar",
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
                    message: "Usuário não existe",
                });
            }

            const result = await repository.usuario.update({
                where: {
                    id,
                },
                data: {
                    nome,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Nome atualizado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
    public async deletarUsuario(req: Request, res: Response) {
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

            await repository.usuario.delete({
                where: {
                    id,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Usuário excluído com sucesso",
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
