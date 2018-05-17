import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ExampleEmployee } from './ExampleEmployee';
import { ExampleProject } from './ExampleProject';

@Table({
  tableName: 'project_employee',
  timestamps: true
})
export class ExampleProjectEmployee extends Model<ExampleProjectEmployee> {

  @Column({
    type: DataType.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @ForeignKey(() => ExampleEmployee)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false
  })
  id_employee: number;

  @ForeignKey(() => ExampleProject)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false
  })
  id_project: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => ExampleProject)
  projeto: ExampleProject;

  @BelongsTo(() => ExampleEmployee)
  funcionario: ExampleEmployee;


}