import { IBaseBusiness } from "../Interfaces/IBaseBusiness";
import { BaseResponse, ErrorResponse } from "../Utilities/BaseResponse";
import { Model } from "sequelize-typescript";
import { IBaseRepository } from "../../Repository/Interfaces/IBaseRepository";

export class BaseBusiness<TRepositoryInterface extends IBaseRepository<T>, T extends Model<T>> implements IBaseBusiness<T> {
    
    protected _baseResponse: BaseResponse;
    
    constructor(private repository: IBaseRepository<T>) { }

    ListAll(): Promise<BaseResponse> {

        this._baseResponse = new BaseResponse();

        return this.repository.ListAll().then(response => {
            if (response) {
                this._baseResponse.success = true;
                this._baseResponse.data = response;
            }
            else {
                this._baseResponse.success = false;
            }

            return this._baseResponse;
        }).catch(error => {
            this._baseResponse.success = false;
            this._baseResponse.error = new ErrorResponse('SERVER_ERROR', error);
            return this._baseResponse;
        });
    }

    ListByID(id: number): Promise<BaseResponse> {

        this._baseResponse = new BaseResponse();

        return this.repository.listByID(id).then(response => {

            if (response) {
                this._baseResponse.success = true;
                this._baseResponse.data = response;
            }
            else {
                this._baseResponse.success = false;
            }

            return this._baseResponse;
        }).catch(error => {
            this._baseResponse.success = false;
            this._baseResponse.error = new ErrorResponse('SERVER_ERROR', error);
            return this._baseResponse;
        });
    }

    Insert(model: T): Promise<BaseResponse> {
        this._baseResponse = new BaseResponse();

        return this.repository.Insert(model).then(response => {

            if (response) {
                this._baseResponse.success = true;
                this._baseResponse.data = response;
            }
            else {
                this._baseResponse.success = false;
            }

            return this._baseResponse;
        }).catch(error => {
            this._baseResponse.success = false;
            this._baseResponse.error = new ErrorResponse('SERVER_ERROR', error);
            return this._baseResponse;
        });
    }

    Update(id: number, model: T): Promise<BaseResponse> {
        this._baseResponse = new BaseResponse();

        return this.repository.Update(id, model).then(response => {

            if (response) {
                this._baseResponse.success = true;
                this._baseResponse.data = response;
            }
            else {
                this._baseResponse.success = false;
            }

            return this._baseResponse;
        }).catch(error => {
            this._baseResponse.success = false;
            this._baseResponse.error = new ErrorResponse('SERVER_ERROR', error);
            return this._baseResponse;
        });
    }

    Delete(id: number): Promise<BaseResponse> {
        this._baseResponse = new BaseResponse();

        return this.repository.Delete(id).then(response => {

            if (response) {
                this._baseResponse.success = true;
                this._baseResponse.data = response;
            }
            else {
                this._baseResponse.success = false;
            }

            return this._baseResponse;
        }).catch(error => {
            this._baseResponse.success = false;
            this._baseResponse.error = new ErrorResponse('SERVER_ERROR', error);
            return this._baseResponse;
        });
    }

}