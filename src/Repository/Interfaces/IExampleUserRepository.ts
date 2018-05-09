import { IBaseRepository } from "./IBaseRepository";;
import { ExampleUser } from "../../Models/Database/ExampleUser";

export interface IExampleUserRepository extends IBaseRepository<ExampleUser>{
    ListByEmail(email: string): Promise<ExampleUser>; 
}