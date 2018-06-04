import { BaseBusiness } from "./BaseBusiness";
import { ExampleUserRepository } from "../../Repository/Repositories/ExampleUserRepository";
import { ExampleUser } from "../../Models/Database/ExampleUser";
import { BaseResponse, ErrorResponse } from "../Utilities/BaseResponse";
import JWToken from "../Extensions/JWToken";

export class ExampleUserBusiness extends BaseBusiness<ExampleUserRepository, ExampleUser> {

    constructor(private _repository: ExampleUserRepository) {
        super(_repository);
    }

    async Authenticate(model: ExampleUser): Promise<BaseResponse> {

        let baseResponse = new BaseResponse();

        return this._repository.ListByEmail(model.email).then((response: ExampleUser) => {
            if (response) {

                if (model.password != response.password) {
                    baseResponse.success = false;
                    baseResponse.error = new ErrorResponse('INVALID_PASSWORD', "Senha inválida");
                }
                else {

                    let token = JWToken.create({
                        expiresIn: 300, //5 minutes
                        data: {
                            id: response.id,
                            email: response.email
                        }
                    });

                    baseResponse.success = true;
                    baseResponse.data = token;
                }
            }
            else {
                baseResponse.success = false;
            }

            return baseResponse;
        }).catch(error => {

            baseResponse.success = false;
            return baseResponse;
        });
    }
}