import { IExampleEmployeeBusiness } from "./IExampleEmployeeBusiness";
import { IExampleProjectBusiness } from "./IExampleProjectBusiness";
import { IExampleUserBusiness } from "./IExampleUserBusiness";

export interface IBusinessFactory {
    GetExampleProjectBusiness(): IExampleProjectBusiness;
    GetExampleEmployeeBusiness(): IExampleEmployeeBusiness;
    GetExampleUserBusiness(): IExampleUserBusiness;
}