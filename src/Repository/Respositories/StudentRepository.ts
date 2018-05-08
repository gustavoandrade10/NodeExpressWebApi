import { UsuarioPortal } from "../models/UsuarioPortal";


export class StudentRepository {

    constructor() {
    }

    async listAll() {
        return await UsuarioPortal.findAll()
            .then(data => data)
            .catch(erro => erro);
    }

    async listByID(id: number) {
        return await UsuarioPortal.findOne({
            where: { id: id }
        }).then(data => data)
        .catch(erro => erro);
    }
}