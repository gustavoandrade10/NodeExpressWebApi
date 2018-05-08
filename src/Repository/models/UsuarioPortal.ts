import {Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'usuario_portal',
  timestamps: false
})
export class UsuarioPortal extends Model<UsuarioPortal> {

  @Column({
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  nome: string;

  @Column({
    type: DataType.STRING(18),
    allowNull: true
  })
  telefone: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  login: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false
  })
  senha: string;

  @Column({
    type: DataType.ENUM('cliente','administrador-cliente'),
    allowNull: false
  })
  tipo: string;

  @CreatedAt
  data_cadastro: Date;

  @UpdatedAt
  data_atualizacao: Date;  

}