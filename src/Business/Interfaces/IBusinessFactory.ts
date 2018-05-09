import { IExampleEmployeeBusiness } from "./IExampleEmployeeBusiness";
import { IExampleProjectBusiness } from "./IExampleProjectBusiness";

export interface IBusinessFactory {
    GetExampleProjectBusiness(): IExampleProjectBusiness;
    GetExampleEmployeeBusiness(): IExampleEmployeeBusiness;
}