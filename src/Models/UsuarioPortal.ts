import {Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'example',
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
    type: DataType.STRING(50),
    allowNull: false
  })
  login: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  nome: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false
  })
  senha: string;

  @Column({
    type: DataType.ENUM('empresa','administrador'),
    allowNull: false
  })
  tipo_usuario: string;


}