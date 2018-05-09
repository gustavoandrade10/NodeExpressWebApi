import { IExampleProjectBusiness } from "../Interfaces/IExampleProjectBusiness";
import { IExampleEmployeeBusiness } from "../Interfaces/IExampleEmployeeBusiness";
import { ExampleProjectBusiness } from "../Rules/ExampleProjectBusiness";
import { ExampleProjectRepository } from "../../Repository/Repositories/ExampleProjectRepository";
import { ExampleEmployeeBusiness } from "../Rules/ExampleEmployeeBusiness";
import { ExampleEmployeeRepository } from "../../Repository/Repositories/ExampleEmployeeRepository";
import { IBusinessFactory } from "../Interfaces/IBusinessFactory";
import { IExampleUserBusiness } from "../Interfaces/IExampleUserBusiness";
import { ExampleUserBusiness } from "../Rules/ExampleUserBusiness";
import { ExampleUserRepository } from "../../Repository/Repositories/ExampleUserRepository";

export class BusinessFactory implements IBusinessFactory {

    private _iExampleProjectBusiness: IExampleProjectBusiness;
    private _iExampleEmployeeBusiness: IExampleEmployeeBusiness;
    private _iExampleUserBusiness: IExampleUserBusiness;

    constructor(){}

    public GetExampleProjectBusiness(): IExampleProjectBusiness{

        this._iExampleProjectBusiness = new ExampleProjectBusiness(new ExampleProjectRepository());

        return this._iExampleProjectBusiness;
    }

    public GetExampleEmployeeBusiness(): IExampleEmployeeBusiness{

        this._iExampleEmployeeBusiness = new ExampleEmployeeBusiness(new ExampleEmployeeRepository());

        return this._iExampleEmployeeBusiness;
    }

    public GetExampleUserBusiness(): IExampleUserBusiness{

        this._iExampleUserBusiness = new ExampleUserBusiness(new ExampleUserRepository());

        return this._iExampleUserBusiness;
    }
}