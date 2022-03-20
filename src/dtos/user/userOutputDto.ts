import { IsDate, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserOutputDto {

  @ApiProperty()
  @IsUUID(4)
  uuid: string;
  
  @Exclude()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  
  @ApiProperty()
  @IsDate()
  updatedAt: Date;
  
  @ApiProperty()
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.email = json.email;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.deletedAt = json.deletedAt ?? null;
  }
}
