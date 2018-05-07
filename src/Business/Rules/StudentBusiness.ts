import { IBaseBusiness } from "../Interfaces/IBaseBusiness";
import {Response } from 'express';
import { StudentRepository } from "../../Repository/Respositories/StudentRepository";
import { BaseResponse } from "../Utilities/BaseResponse";

export class StudentBusiness implements IBaseBusiness {
    
    private _response: BaseResponse;
    private _repository: StudentRepository;
    constructor(){
        this._repository = new StudentRepository();
    }

    listAll(): BaseResponse{

        this._response = new BaseResponse();
        
        return this._repository.listAll().then(model => {
           this._response.success = true;
           this._response.data = model;

           return this._response;
        })
        .catch( error => {

            this._response.success = false;
            return this._response;
        });
    }

    listByID(id: number): BaseResponse {
        throw new Error("Method not implemented.");
    }

    insert(model: any): BaseResponse {
        throw new Error("Method not implemented.");
    }

    update(model: any): BaseResponse {
        throw new Error("Method not implemented.");
    }

    delete(id: number): BaseResponse {
        throw new Error("Method not implemented.");
    }

}