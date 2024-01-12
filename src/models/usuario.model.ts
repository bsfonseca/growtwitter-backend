import { randomUUID } from "crypto";

export class Usuario {
    public id: string;

    constructor(public nome: string, public email: string, public username: string, private _senha: string) {
        this.id = randomUUID();
    }

    public get senha() {
        return this._senha;
    }
}
