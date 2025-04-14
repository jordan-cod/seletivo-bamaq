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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
    return { message: 'Usuário criado com sucesso!' };
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@UuidValidation() id: string) {
    const user = await this.userService.getUserBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
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
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@UuidValidation() id: string) {
    await this.userService.deleteUser(id);
    return { message: 'Usuário deletado com sucesso!' };
  }
}
