import { IBaseRepository } from "./IBaseRepository";
import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";

export interface IExampleEmployeeRepository extends IBaseRepository<ExampleEmployee>{
}