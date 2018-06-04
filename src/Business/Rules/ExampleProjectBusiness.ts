import { BaseBusiness } from "./BaseBusiness";
import { ExampleProjectRepository } from "../../Repository/Repositories/ExampleProjectRepository";
import { ExampleProject } from "../../Models/Database/ExampleProject";
import { BaseResponse } from "../Utilities/BaseResponse";

export class ExampleProjectBusiness extends BaseBusiness<ExampleProjectRepository, ExampleProject> {

    constructor(private _repository: ExampleProjectRepository) {
        super(_repository);
    }

    ListAllProjectsWithManager(): Promise<BaseResponse> {
        return this.handleBaseResponse(this._repository.ListAllProjectsWithManager());
    }

}