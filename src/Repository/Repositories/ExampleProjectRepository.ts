
import { ExampleProject } from "../../Models/Database/ExampleProject";
import { BaseRepository } from "./BaseRepository";
import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";
import { ExampleProjectEmployee } from "../../Models/Database/ExampleProjectEmployee";
import { Sequelize } from "sequelize-typescript";

export class ExampleProjectRepository extends BaseRepository<ExampleProject> {

    constructor() {
        super(ExampleProject);
    }

    async ListAllProjectsWithManager(): Promise<ExampleProject[]> {
        return await ExampleProject.findAll({
            attributes: ['title'],
            include: [
                {
                    model: ExampleEmployee,
                    attributes: ['firstname']
                },
                {
                    model: ExampleProjectEmployee
                }
            ]
        })
            .then(data => data)
            .catch(erro => this.handleError(erro));
    }

    async ListAllProjectsWithManagerWithQuery(): Promise<ExampleProject[]> {
        let sql = `
            SELECT proj.id, proj.title, manager.firstname 
            FROM  project as proj
            LEFT OUTER JOIN employee as manager
            ON proj.id_manager = manager.id;`;

        return await this._sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
            .then(data => data)
            .catch(erro => this.handleError(erro));
    }
}