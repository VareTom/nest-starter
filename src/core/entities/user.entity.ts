import {
  Column,
  DataType,
  Default, Index,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import { IsString } from 'class-validator';

@Table({
  timestamps: true,
  paranoid: true
})
export class User extends Model<User> {
  
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Unique
  @Column
  uuid: string;
  
  @IsEmail
  @Index({unique: true})
  @Column
  email: string;
  
  @IsString()
  @Column
  password: string;
}
