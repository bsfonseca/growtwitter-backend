import { NextFunction, Request, Response } from "express";
import repository from "../database/prisma.repository";

export async function validaLoginMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;

        if (!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token de autenticação não autorizado",
            });
        }

        const usuario = await repository.usuario.findUnique({
            where: {
                id,
            },
        });

        if (!usuario || usuario.token !== authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token de validação não informado",
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
