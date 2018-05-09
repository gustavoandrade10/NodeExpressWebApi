import { BaseRepository } from "./BaseRepository";
import { ExampleUser } from "../../Models/Database/ExampleUser";
import { IExampleUserRepository } from "../Interfaces/IExampleUserRepository";

export class ExampleUserRepository extends BaseRepository<ExampleUser> implements IExampleUserRepository {

    constructor() {
        super(ExampleUser);
    }

    async ListByEmail(email: string): Promise<ExampleUser> {
        return await this.model.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email', 'password']
        })
        .then(data => data)
        .catch(erro => erro);
    }
}