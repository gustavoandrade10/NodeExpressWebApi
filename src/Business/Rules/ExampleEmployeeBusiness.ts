import { BaseBusiness } from "./BaseBusiness";
import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";
import { IExampleEmployeeBusiness } from "../Interfaces/IExampleEmployeeBusiness";
import { IExampleEmployeeRepository } from "../../Repository/Interfaces/IExampleEmployeeRepository";

export class ExampleEmployeeBusiness extends BaseBusiness<IExampleEmployeeRepository, ExampleEmployee> implements IExampleEmployeeBusiness {

    constructor(private _repository: IExampleEmployeeRepository) {
        super(_repository);
    }

}