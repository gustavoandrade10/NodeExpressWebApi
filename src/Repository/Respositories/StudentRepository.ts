import * as db from '../models/';

export class StudentRepository {

    constructor() {
    }

    async listAll() {
        return await db.usuario_portal.findAll()
            .then(data => data)
            .catch(erro => erro);
    }

    async listByID(id: number) {
        return await db.usuario_portal.findOne({
            where: { id: id }
        }).then(data => data)
        .catch(erro => erro);
    }
}