import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsPhoneNumber()
  telefone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
