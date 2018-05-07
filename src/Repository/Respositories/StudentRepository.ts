import * as db from '../models/';
import { Model } from 'sequelize';

export class StudentRepository {
    
    constructor() {
    }

    listAll():any{
       return db.aluno.findAll();
    }
}