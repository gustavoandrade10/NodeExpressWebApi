import { BaseResponse } from "../Utilities/BaseResponse";

export interface IBaseBusiness{
    listAll(): Promise<BaseResponse>;
    listByID(id: number): Promise<BaseResponse>;
    insert(model: any): Promise<BaseResponse>;
    update(id:number, model: any):  Promise<BaseResponse>;
    delete(id: number): Promise<BaseResponse>; 
}