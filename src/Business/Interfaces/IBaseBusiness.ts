import { BaseResponse } from "../Utilities/BaseResponse";

export interface IBaseBusiness{

    listAll(): Promise<BaseResponse>;

    listByID(id: number): Promise<BaseResponse>;

    insert(model: any): BaseResponse;

    update(model: any):  BaseResponse;

    delete(id: number): BaseResponse; 

}