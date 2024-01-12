import { randomUUID } from "crypto";

export class Usuario {
    public id: String;

    constructor(public nome: string, public email: string, public username: string, private senha: string) {
        this.id = randomUUID();
    }
}
