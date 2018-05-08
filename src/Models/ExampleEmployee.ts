import {Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'employee',
  timestamps: false
})
export class ExampleEmployee extends Model<ExampleEmployee> {

  @Column({
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING(45),
    allowNull: false
  })
  firstname: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false
  })
  lastname: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false
  })
  phone: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  email: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

}