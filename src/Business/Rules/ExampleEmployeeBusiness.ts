import { BaseBusiness } from "./BaseBusiness";
import { ExampleEmployeeRepository } from "../../Repository/Repositories/ExampleEmployeeRepository";
import { ExampleEmployee } from "../../Models/Database/ExampleEmployee";

export class ExampleEmployeeBusiness extends BaseBusiness<ExampleEmployeeRepository, ExampleEmployee> {

    constructor(private _repository: ExampleEmployeeRepository) {
        super(_repository);
    }

}