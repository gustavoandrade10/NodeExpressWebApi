import { BaseResponse } from "../Utilities/BaseResponse";

export interface IBaseBusiness<T>{
    ListAll(): Promise<BaseResponse>;
    ListByID(id: number): Promise<BaseResponse>;
    Insert(model: T): Promise<BaseResponse>;
    Update(id:number, model: T):  Promise<BaseResponse>;
    Delete(id: number): Promise<BaseResponse>; 
}