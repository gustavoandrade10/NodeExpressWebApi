import { ExampleProjectRepository } from "../../Repository/Respositories/ExampleProjectRepository";
import { ExampleProject } from "../../Models/ExampleProject";
import { BaseBusiness } from "./BaseBusiness";

export class ExampleProjectBusiness extends BaseBusiness<ExampleProject> {
    
    constructor() {
        super(new ExampleProjectRepository());
    }

}