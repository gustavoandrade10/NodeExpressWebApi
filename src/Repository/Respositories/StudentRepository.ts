import * as db from '../models/';

export class StudentRepository {
    
    constructor() {
    }

    async listAll(){
       return await db.usuario_portal.findAll()
       .then(data => data)
       .catch(erro => erro);
    }
}