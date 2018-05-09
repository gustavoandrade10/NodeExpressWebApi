import { BaseBusiness } from "./BaseBusiness";
import { IExampleUserRepository } from "../../Repository/Interfaces/IExampleUserRepository";
import { IExampleUserBusiness } from "../Interfaces/IExampleUserBusiness";
import { ExampleUser } from "../../Models/Database/ExampleUser";
import { BaseResponse, ErrorResponse } from "../Utilities/BaseResponse";
import JWToken from "../../Config/JsonWebToken/JWToken";

export class ExampleUserBusiness extends BaseBusiness<IExampleUserRepository, ExampleUser> implements IExampleUserBusiness {

    constructor(private _repository: IExampleUserRepository) {
        super(_repository);
    }


    async Authenticate(model: ExampleUser): Promise<BaseResponse> {

        this._baseResponse = new BaseResponse();

        return this._repository.ListByEmail(model.email).then((response: ExampleUser) => {
            if (response) {

                if (model.password != response.password) {
                    this._baseResponse.success = false;
                    this._baseResponse.error = new ErrorResponse('INVALID_PASSWORD', "Senha inválida");
                }
                else {

                    let token = JWToken.createJWToken({
                        expiresIn: 5000, //5 minutes
                        data: {
                            id: response.id,
                            email: response.email
                        }
                    });

                    this._baseResponse.success = true;
                    this._baseResponse.data = token;
                }
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