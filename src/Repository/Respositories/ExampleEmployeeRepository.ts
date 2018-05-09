import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";
import { BaseRepository } from "./BaseRepository";
import { IExampleEmployeeRepository } from "../Interfaces/IExampleEmployeeRepository";


export class ExampleEmployeeRepository extends BaseRepository<ExampleEmployee> implements IExampleEmployeeRepository{

    constructor() {
        super(ExampleEmployee);
    }

}