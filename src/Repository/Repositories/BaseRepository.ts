import { Model, Sequelize } from "sequelize-typescript";
import { NonAbstractTypeOfModel } from "sequelize-typescript/lib/models/Model";
import { IBaseRepository } from "../Interfaces/IBaseRepository";
import { GlobalVars } from "../../Config/configs";

export class BaseRepository<T extends Model<T>> implements IBaseRepository<T>{
    
    protected _sequelize: Sequelize;
    constructor(private model: NonAbstractTypeOfModel<T>) {
        this._sequelize = GlobalVars.SequelizeInstance;
    }

    async ListAll(): Promise<T[]>{  
        return await this.model.findAll<T>()
        .then(data => data)
        .catch(erro => this.handleError(erro));
    }

    async GetByID(id: number): Promise<T> {
        return await this.model.findOne(<any>{where:{ id: id}})
        .then(data => data)
        .catch(erro => this.handleError(erro));
    }

    async Insert(model: T): Promise<T> {
        return await this.model.create(model)
        .then(data => data)
        .catch(erro => this.handleError(erro));
    }

    async Update(id: number, model: T): Promise<T> {
        return await this.model.update(model,<any>{where:{ id: id}})
        .then(data => data)
        .catch(erro => this.handleError(erro));
    }

    async Delete(id: number): Promise<T> {
        return await this.model.destroy(<any>{where:{ id: id}})
        .then(data => data)
        .catch(erro => this.handleError(erro));
    }

    protected handleError(error){
        console.log(error);
        return error;
    }
}