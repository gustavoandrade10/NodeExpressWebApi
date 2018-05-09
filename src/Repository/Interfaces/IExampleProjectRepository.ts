import { IBaseRepository } from "./IBaseRepository";
import { ExampleProject } from "../../Models/Database/ExampleProject";

export interface IExampleProjectRepository extends IBaseRepository<ExampleProject>{
    ListAllProjectsWithManager(): Promise<any[]>;
}