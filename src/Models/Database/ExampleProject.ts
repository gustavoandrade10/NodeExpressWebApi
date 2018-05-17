import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ExampleEmployee } from './ExampleEmployee';
import { ExampleProjectEmployee } from './ExampleProjectEmployee';

@Table({
  tableName: 'project',
  timestamps: true
})
export class ExampleProject extends Model<ExampleProject> {

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
  title: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  initial_date: Date;

  @Column({
    type: DataType.DATE(),
    allowNull: true
  })
  final_date: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @ForeignKey(() => ExampleEmployee)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false
  })
  id_manager: number;

  @BelongsTo(() => ExampleEmployee)
  manager: ExampleEmployee;

  @HasMany(() => ExampleProjectEmployee)
  projetos: ExampleProjectEmployee;

}