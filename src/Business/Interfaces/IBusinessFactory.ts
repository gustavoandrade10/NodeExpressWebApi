import { ExampleProjectBusiness } from "../Rules/ExampleProjectBusiness";
import { ExampleEmployeeBusiness } from "../Rules/ExampleEmployeeBusiness";
import { ExampleUserBusiness } from "../Rules/ExampleUserBusiness";


export interface IBusinessFactory {
    GetExampleProjectBusiness(): ExampleProjectBusiness;
    GetExampleEmployeeBusiness(): ExampleEmployeeBusiness;
    GetExampleUserBusiness(): ExampleUserBusiness;
}