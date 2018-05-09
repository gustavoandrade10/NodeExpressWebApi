import { BaseResponse } from "../Utilities/BaseResponse";
import { IBaseBusiness } from "./IBaseBusiness";
import { ExampleProject } from "../../Models/Database/ExampleProject";

export interface IExampleProjectBusiness extends IBaseBusiness<ExampleProject>{
    ListAllProjectsWithManager(): Promise<BaseResponse>;
}