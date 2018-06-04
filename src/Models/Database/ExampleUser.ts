import { Table, Column, Model, DataType, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true
})
export class ExampleUser extends Model<ExampleUser> {

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
  name: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false
  })
  password: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

}
