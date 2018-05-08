import { Model } from "sequelize-typescript";
import { NonAbstractTypeOfModel } from "sequelize-typescript/lib/models/Model";
import { IBaseRepository } from "../Interfaces/IBaseRepository";

export class BaseRepository<T extends Model<T>> implements IBaseRepository<T>{
    
    constructor(protected model: NonAbstractTypeOfModel<T>) {}

    async ListAll(): Promise<T[]>{  
        return await this.model.findAll<T>()
        .then(data => data)
        .catch(erro => erro);
    }

    async listByID(id: number): Promise<T> {
        return await this.model.findOne(<any>{where:{ id: id}})
        .then(data => data)
        .catch(erro => erro);
    }

    async Insert(model: T): Promise<T> {
        return await this.model.create(model)
        .then(data => data)
        .catch(erro => erro);
    }

    async Update(id: number, model: T): Promise<T> {
        return await this.model.update(model,<any>{where:{ id: id}})
        .then(data => data)
        .catch(erro => erro);
    }

    async Delete(id: number): Promise<T> {
        return await this.model.destroy(<any>{where:{ id: id}})
        .then(data => data)
        .catch(erro => erro);
    }

}