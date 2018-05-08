import { IBaseBusiness } from "../Interfaces/IBaseBusiness";
import { StudentRepository } from "../../Repository/Respositories/StudentRepository";
import { BaseResponse } from "../Utilities/BaseResponse";

export class StudentBusiness implements IBaseBusiness {
    
    private _response: BaseResponse;
    private _repository: StudentRepository;
    constructor(){
        this._repository = new StudentRepository();
    }

    listAll(){

        this._response = new BaseResponse();
        
        return this._repository.listAll().then(response => {
           this._response.success = true;
           this._response.data = response;
           
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