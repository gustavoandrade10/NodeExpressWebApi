
import { ExampleProject } from "../../Models/Database/ExampleProject";
import { BaseRepository } from "./BaseRepository";
import { IExampleProjectRepository } from "../Interfaces/IExampleProjectRepository";
import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";

export class ExampleProjectRepository extends BaseRepository<ExampleProject> implements IExampleProjectRepository{

    constructor() {
        super(ExampleProject);
    }

    async ListAllProjectsWithManager(): Promise<ExampleProject[]>{
        return await  this.model.findAll({
            include: [{
                model: ExampleEmployee,
                attributes: ['firstname']
            }], 
            attributes: ['title']})
        .then(data => data)
        .catch(erro => erro);
    }
}