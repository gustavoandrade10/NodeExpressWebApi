
import { ExampleProject } from "../../Models/Database/ExampleProject";
import { BaseRepository } from "./BaseRepository";
import { IExampleProjectRepository } from "../Interfaces/IExampleProjectRepository";
import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";


export class ExampleProjectRepository extends BaseRepository<ExampleProject> implements IExampleProjectRepository{

    constructor() {
        super(ExampleProject);
    }

    async ListAllProjectsWithManager(): Promise<ExampleProject[]>{
        return await  ExampleProject.findAll({
            include: [{
                model: ExampleEmployee,
                attributes: ['firstname']
            }], 
            attributes: ['title', 'gerentes.firstname']})
        .then(data => data)
        .catch(erro => erro);
    }
}