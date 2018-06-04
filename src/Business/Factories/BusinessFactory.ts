import { IBusinessFactory } from "../Interfaces/IBusinessFactory";
import { ExampleProjectBusiness } from "../Rules/ExampleProjectBusiness";
import { ExampleProjectRepository } from "../../Repository/Repositories/ExampleProjectRepository";
import { ExampleEmployeeBusiness } from "../Rules/ExampleEmployeeBusiness";
import { ExampleEmployeeRepository } from "../../Repository/Repositories/ExampleEmployeeRepository";
import { ExampleUserBusiness } from "../Rules/ExampleUserBusiness";
import { ExampleUserRepository } from "../../Repository/Repositories/ExampleUserRepository";

export class BusinessFactory implements IBusinessFactory {

    constructor() { }

    public GetExampleProjectBusiness(): ExampleProjectBusiness {

        return new ExampleProjectBusiness(new ExampleProjectRepository());
    }

    public GetExampleEmployeeBusiness(): ExampleEmployeeBusiness {

        return new ExampleEmployeeBusiness(new ExampleEmployeeRepository());
    }

    public GetExampleUserBusiness(): ExampleUserBusiness {

        return new ExampleUserBusiness(new ExampleUserRepository());
    }
}