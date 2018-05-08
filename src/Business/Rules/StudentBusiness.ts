import { IBaseBusiness } from "../Interfaces/IBaseBusiness";
import { StudentRepository } from "../../Repository/Respositories/StudentRepository";
import { BaseResponse } from "../Utilities/BaseResponse";

export class StudentBusiness implements IBaseBusiness {

    private _response: BaseResponse;
    private _repository: StudentRepository;
    constructor() {
        this._repository = new StudentRepository();
    }

    listAll(): Promise<BaseResponse> {

        this._response = new BaseResponse();

        return this._repository.ListAll().then(response => {
            if (response) {
                this._response.success = true;
                this._response.data = response;
            }
            else {
                this._response.success = false;
            }

            return this._response;
        }).catch(error => {

            this._response.success = false;
            return this._response;
        });
    }

    listByID(id: number): Promise<BaseResponse> {

        this._response = new BaseResponse();

        return this._repository.listByID(id).then(response => {

            if (response) {
                this._response.success = true;
                this._response.data = response;
            }
            else {
                this._response.success = false;
            }

            return this._response;
        }).catch(error => {

            this._response.success = false;
            return this._response;
        });
    }

    insert(model: any): Promise<BaseResponse> {
        this._response = new BaseResponse();

        return this._repository.Insert(model).then(response => {

            if (response) {
                this._response.success = true;
                this._response.data = response;
            }
            else {
                this._response.success = false;
            }

            return this._response;
        }).catch(error => {

            this._response.success = false;
            return this._response;
        });
    }

    update(id: number, model: any): Promise<BaseResponse> {
        this._response = new BaseResponse();

        return this._repository.Update(id, model).then(response => {

            if (response) {
                this._response.success = true;
                this._response.data = response;
            }
            else {
                this._response.success = false;
            }

            return this._response;
        }).catch(error => {

            this._response.success = false;
            return this._response;
        });
    }

    delete(id: number): Promise<BaseResponse> {
        this._response = new BaseResponse();

        return this._repository.Delete(id).then(response => {

            if (response) {
                this._response.success = true;
                this._response.data = response;
            }
            else {
                this._response.success = false;
            }

            return this._response;
        }).catch(error => {

            this._response.success = false;
            return this._response;
        });
    }

}