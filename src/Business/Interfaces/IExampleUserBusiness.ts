import { IBaseBusiness } from "./IBaseBusiness";
import { ExampleUser } from "../../Models/Database/ExampleUser";
import { BaseResponse } from "../Utilities/BaseResponse";

export interface IExampleUserBusiness extends IBaseBusiness<ExampleUser>{
    Authenticate(model: ExampleUser): Promise<BaseResponse>;
}