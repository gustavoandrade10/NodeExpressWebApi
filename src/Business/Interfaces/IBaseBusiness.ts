import { BaseResponse } from "../Utilities/BaseResponse";

export interface IBaseBusiness{

    listAll(): BaseResponse;

    listByID(id: number): BaseResponse;

    insert(model: any): BaseResponse;

    update(model: any):  BaseResponse;

    delete(id: number): BaseResponse; 

}