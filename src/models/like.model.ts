import { Tweet, Usuario } from "@prisma/client";

export class Like {
    constructor(public usuario: Usuario, public tweet: Tweet) {}
}
