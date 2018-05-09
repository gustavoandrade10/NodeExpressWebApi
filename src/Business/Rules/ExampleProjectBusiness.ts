import { ExampleProjectRepository } from "../../Repository/Respositories/ExampleProjectRepository";
import { ExampleProject } from "../../Models/Database/ExampleProject";
import { BaseBusiness } from "./BaseBusiness";
import { BaseResponse } from "../Utilities/BaseResponse";
import { IExampleProjectBusiness } from "../Interfaces/IExampleProjectBusiness";
import { IExampleProjectRepository } from "../../Repository/Interfaces/IExampleProjectRepository";

export class ExampleProjectBusiness extends BaseBusiness<IExampleProjectRepository, ExampleProject> implements IExampleProjectBusiness {


    constructor(private _repository: IExampleProjectRepository) {
        super(_repository);
    }


    ListAllProjectsWithManager(): Promise<BaseResponse> {
        this._baseResponse = new BaseResponse();

        return this._repository.ListAllProjectsWithManager().then(response => {
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
            return this._baseResponse;
        });
    }

}