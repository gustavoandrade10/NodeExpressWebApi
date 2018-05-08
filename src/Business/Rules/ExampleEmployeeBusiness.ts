import { BaseBusiness } from "./BaseBusiness";
import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";
import { ExampleEmployeeRepository } from "../../Repository/Respositories/ExampleEmployeeRepository";
import { IExampleEmployeeBusiness } from "../Interfaces/IExampleEmployeeBusiness";

export class ExampleEmployeeBusiness extends BaseBusiness<ExampleEmployee> implements IExampleEmployeeBusiness{
    
    constructor(private _repository: ExampleEmployeeRepository ) {
        super(_repository);
    }

}