import { IBaseBusiness } from "../Interfaces/IBaseBusiness";
import { BaseResponse, ErrorResponse } from "../Utilities/BaseResponse";
import { Model } from "sequelize-typescript";
import { BaseRepository } from "../../Repository/Repositories/BaseRepository";

export class BaseBusiness<TRepository extends BaseRepository<T>, T extends Model<T>> implements IBaseBusiness<T> {
    
    constructor(private repository: TRepository) { }

    ListAll(): Promise<BaseResponse> {
        return this.handleBaseResponse(this.repository.ListAll());
    }

    ListByID(id: number): Promise<BaseResponse> {
        return this.handleBaseResponse(this.repository.listByID(id));
    }

    Insert(model: T): Promise<BaseResponse> {
        return this.handleBaseResponse(this.repository.Insert(model));
    }

    Update(id: number, model: T): Promise<BaseResponse> {
        return this.handleBaseResponse(this.repository.Update(id, model));
    }

    Delete(id: number): Promise<BaseResponse> {
        return this.handleBaseResponse(this.repository.Delete(id));
    }

    protected handleBaseResponse(promise: Promise<T | T[]>): Promise<BaseResponse>{
        let baseResponse = new BaseResponse();

        return promise.then(response => {

            if (response) {
               baseResponse.success = true;
               baseResponse.data = response;
            }
            else {
                baseResponse.success = false;
            }

            return baseResponse;
        }).catch(error => {
            baseResponse.success = false;
            baseResponse.error = new ErrorResponse('SERVER_ERROR', error);
            return baseResponse;
        });
    }
}