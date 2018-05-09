import { IExampleProjectBusiness } from "../Interfaces/IExampleProjectBusiness";
import { IExampleEmployeeBusiness } from "../Interfaces/IExampleEmployeeBusiness";
import { ExampleProjectBusiness } from "../Rules/ExampleProjectBusiness";
import { ExampleProjectRepository } from "../../Repository/Respositories/ExampleProjectRepository";
import { ExampleEmployeeBusiness } from "../Rules/ExampleEmployeeBusiness";
import { ExampleEmployeeRepository } from "../../Repository/Respositories/ExampleEmployeeRepository";
import { IBusinessFactory } from "../Interfaces/IBusinessFactory";

export class BusinessFactory implements IBusinessFactory {

    private _iExampleProjectBusiness: IExampleProjectBusiness;
    private _iExampleEmployeeBusiness: IExampleEmployeeBusiness;

    constructor(){}

    public GetExampleProjectBusiness(): IExampleProjectBusiness{

        this._iExampleProjectBusiness = new ExampleProjectBusiness(new ExampleProjectRepository());

        return this._iExampleProjectBusiness;
    }

    public GetExampleEmployeeBusiness(): IExampleEmployeeBusiness{

        this._iExampleEmployeeBusiness = new ExampleEmployeeBusiness(new ExampleEmployeeRepository());

        return this._iExampleEmployeeBusiness;
    }
}