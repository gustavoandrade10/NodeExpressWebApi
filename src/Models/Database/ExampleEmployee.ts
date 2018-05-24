import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { ExampleProject } from './ExampleProject';

@Table({
  tableName: 'employee',
  timestamps: true
})
export class ExampleEmployee extends Model<ExampleEmployee> {

  // @swaggerhideproperty
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

  @HasMany(() => ExampleProject)
  projects: ExampleProject[];

}