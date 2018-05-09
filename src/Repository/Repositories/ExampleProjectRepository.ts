
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
            attributes: ['title'],
            include: [{
                model: ExampleEmployee,
                attributes: ['firstname']
            }] 
        })
        .then(data => data)
        .catch(erro => erro);
    }
}