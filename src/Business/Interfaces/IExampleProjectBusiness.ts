import { BaseResponse } from "../Utilities/BaseResponse";

export interface IExampleProjectBusiness{
    ListAllProjectsWithManager(): Promise<BaseResponse>;
}