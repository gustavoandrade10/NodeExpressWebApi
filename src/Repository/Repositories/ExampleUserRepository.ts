import { BaseRepository } from "./BaseRepository";
import { ExampleUser } from "../../Models/Database/ExampleUser";
import { Sequelize } from "sequelize-typescript";


export class ExampleUserRepository extends BaseRepository<ExampleUser> {
    constructor() {
        super(ExampleUser);
    }

    async ListByEmail(email: string): Promise<ExampleUser> {
        return await ExampleUser.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email', 'password']
        })
            .then(data => data)
            .catch(erro => this.handleError(erro));
    }

    async ListByEmailWithQuery(email: string): Promise<ExampleUser> {
        let sql = `
            SELECT id, name, email, password 
            FROM user 
            WHERE user.email = :email 
            LIMIT 1;
        `;

        return await this._sequelize.query(sql, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: {
                email: email
            }
        })
            .then(data => {
                let user = {
                    id: data[0].id,
                    name: data[0].name,
                    email: data[0].email,
                    password: data[0].password
                }

                return user;
            })
            .catch(erro => this.handleError(erro));
    }
}