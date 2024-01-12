import { Usuario } from "@prisma/client";
import { Usuario as UsuarioBack } from "../models/usuario.model";

export function adapterUsuario(usuario: Usuario): UsuarioBack {
    const novoUsuario = new UsuarioBack(usuario.nome, usuario.email, usuario.username, usuario.senha);
    novoUsuario.id = usuario.id;

    return novoUsuario;
}
