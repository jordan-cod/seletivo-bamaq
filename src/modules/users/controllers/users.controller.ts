import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { UuidValidation } from 'src/common/decorators/uuid-vallidation.decorator';
import { UpdateUserDto } from '../dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);

    if (result.emailFailed) {
      return {
        message: 'Usuário criado com sucesso, mas o envio do e-mail falhou.',
        user: plainToInstance(UserResponseDto, result.user),
      };
    }

    return {
      message: 'Usuário criado e e-mail de boas-vindas enviado com sucesso!',
      user: plainToInstance(UserResponseDto, result.user),
    };
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return plainToInstance(UserResponseDto, users);
  }

  @Get(':id')
  async getUserById(@UuidValidation() id: string) {
    const user = await this.userService.getUserBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return plainToInstance(UserResponseDto, user);
  }

  @Put(':id')
  async updateUser(
    @UuidValidation() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Tive que fazer isso pois tive problemas com o class validator
    const hasAtLeastOneField = Object.values(updateUserDto).some(
      (value) => value !== undefined && value !== null && value !== '',
    );

    if (!hasAtLeastOneField) {
      throw new BadRequestException(
        'Pelo menos um dos campos deve ser informado: nome, telefone, email ou senha.',
      );
    }
    const user = await this.userService.updateUser(id, updateUserDto);
    return plainToInstance(UserResponseDto, user);
  }

  @Delete(':id')
  async deleteUser(@UuidValidation() id: string) {
    await this.userService.deleteUser(id);
    return { message: 'Usuário deletado com sucesso!' };
  }
}
