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
import { isValidUUID } from 'src/common/validators/uuid.validator';

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
  async getUserById(@Param('id') id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Formato de UUID inválido.');
    }

    const user = await this.userService.getUserBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  //   @Put(':id')
  //   async updateUser(@Body() id: string, @Body() updateUserDto: CreateUserDto) {
  //     return await this.userService.updateUser(id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   deleteUser(@Body() id: string) {
  //     await this.userService.deleteUser(id);
  //     return { message: 'Usuário deletado com sucesso!' };
  //   }
}
