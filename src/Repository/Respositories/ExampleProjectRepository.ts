
import { ExampleProject } from "../../Models/ExampleProject";
import { BaseRepository } from "./BaseRepository";


export class ExampleProjectRepository extends BaseRepository<ExampleProject>{

    constructor() {
        super(ExampleProject);
    }

}