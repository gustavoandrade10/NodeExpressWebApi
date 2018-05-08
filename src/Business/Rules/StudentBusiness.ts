import { BaseBusiness } from "./BaseBusiness";
import { UsuarioPortal } from "../../Models/UsuarioPortal";
import { StudentRepository } from "../../Repository/Respositories/StudentRepository";

export class StudentBusiness extends BaseBusiness<UsuarioPortal> {
    
    constructor() {
        super(new StudentRepository());
    }

}