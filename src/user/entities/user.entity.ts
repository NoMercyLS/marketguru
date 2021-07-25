import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Exclude } from 'class-transformer';
import { IUser } from '../interfaces';

@Table({ modelName: 'user', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: false })
export class User extends Model<User, IUser> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    defaultValue: null,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    defaultValue: null,
  })
  login: string;

  @Exclude()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  birthdate: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updated_at: Date;
}