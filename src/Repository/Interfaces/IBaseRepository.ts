export interface IBaseRepository<T>{
    ListAll(): Promise<T[]>;
    GetByID(id: number): Promise<T>;
    Insert(model: T): Promise<T>;
    Update(id: number ,model : T): Promise<T>;
    Delete(id: number): Promise<T>;
}