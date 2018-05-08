import { BaseBusiness } from "./BaseBusiness";
import { ExampleEmployee } from "../../Models/ExampleEmployee";
import { ExampleEmployeeRepository } from "../../Repository/Respositories/ExampleEmployeeRepository";

export class ExampleEmployeeBusiness extends BaseBusiness<ExampleEmployee> {
    
    constructor() {
        super(new ExampleEmployeeRepository());
    }

}