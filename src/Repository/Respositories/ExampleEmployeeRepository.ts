import { ExampleEmployee } from "../../Models/ExampleEmployee";
import { BaseRepository } from "./BaseRepository";


export class ExampleEmployeeRepository extends BaseRepository<ExampleEmployee>{

    constructor() {
        super(ExampleEmployee);
    }

}