import { UsuarioPortal } from "../../Models/UsuarioPortal";
import { BaseRepository } from "./BaseRepository";


export class StudentRepository extends BaseRepository<UsuarioPortal>{

    constructor() {
        super(UsuarioPortal);
    }

}