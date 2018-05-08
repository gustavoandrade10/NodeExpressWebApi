import { IBaseBusiness } from "../Interfaces/IBaseBusiness";
import { BaseResponse } from "../Utilities/BaseResponse";
import { Model } from "sequelize-typescript";
import { BaseRepository } from "../../Repository/Respositories/BaseRepository";

export class BaseBusiness<T extends Model<T>> implements IBaseBusiness<T> {
    
    private _response: BaseResponse;
    constructor(private _repository: BaseRepository<T>) { }

    ListAll(): Promise<BaseResponse> {

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

    ListByID(id: number): Promise<BaseResponse> {

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

    Insert(model: T): Promise<BaseResponse> {
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

    Update(id: number, model: T): Promise<BaseResponse> {
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

    Delete(id: number): Promise<BaseResponse> {
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